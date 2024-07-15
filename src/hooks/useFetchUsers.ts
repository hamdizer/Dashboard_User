import { useState, useEffect, useRef } from "react";
import axios, { CancelTokenSource } from "axios";
import { User } from "../types/user";
// Define the shape of the object that this hook will return
interface UseFetchUserReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const useFetchUser = (userId: number | null): UseFetchUserReturn => {
  // State to hold the fetched user data
  const [user, setUser] = useState<User | null>(null);
  // State to track if data is being fetched
  const [loading, setLoading] = useState<boolean>(false);
  // State to hold any error message
  const [error, setError] = useState<string | null>(null);
  // Ref to store the debounce timeout ID
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  // Ref to store the cancel token source for canceling requests
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  useEffect(() => {
    // Clear any existing debounce timeout to prevent outdated requests
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (userId !== null) {
      // Set up debounce with a 1000ms delay
      debounceTimeout.current = setTimeout(() => {
        const fetchData = async () => {
          // Cancel any previous request if it exists
          if (cancelTokenSource.current) {
            cancelTokenSource.current.cancel(
              "Request canceled due to new request"
            );
          }
          // Create a new cancel token source for this request
          cancelTokenSource.current = axios.CancelToken.source();

          setLoading(true);
          setError(null);

          try {
            const response = await axios.get<User>(
              `${process.env.REACT_APP_USERS_API}/${userId}`,
              {
                cancelToken: cancelTokenSource.current.token,
              }
            );
            setUser(response.data);
          } catch (error) {
            if (axios.isCancel(error)) {
              console.log("Request canceled:", error.message);
            } else {
              setError("Error fetching data");
            }
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }, 1000);
    } else {
      setUser(null);
    }
    // Cleanup function to clear timeout and cancel any ongoing request
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel("Component unmounted or ID changed");
      }
    };
  }, [userId]);

  return { user, loading, error };
};

export default useFetchUser;
