import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const checkAuth = async ({ context }) => {
    const { queryClient, store } = context;

    try {
        const user = await queryClient.ensureQueryData({
            queryKey: ["currentUser"],
            queryFn: getCurrentUser,
            retry: false,
        });

        if (!user) {
            throw redirect({ to: "/auth" });
        }

        store.dispatch(login(user));

    } catch (error) {
        // If it's already a redirect, re-throw it
        if (error?.href) {
            throw error;
        }
        // Otherwise redirect to auth
        throw redirect({ to: "/auth" });
    }
}