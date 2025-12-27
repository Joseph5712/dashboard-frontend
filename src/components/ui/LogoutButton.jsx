import { removeToken } from "../../utils/auth";

export default function LogoutButton() {
    function handleLogout() {
        removeToken();
        window.location.href = "/login";
    }

    return (
        <button onClick={handleLogout} style={{ padding: 8 }}>
            Logout
        </button>
    );
}
