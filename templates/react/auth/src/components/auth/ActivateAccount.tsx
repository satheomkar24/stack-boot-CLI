import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { SpinnerContext } from "../../context/SpinnerContext";
import { authService } from "../../services/authService";

type Status = "loading" | "success" | "expired" | "error";

const ActivateAccountForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { setIsLoading } = useContext(SpinnerContext);

  const [status, setStatus] = useState<Status>("loading");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid activation link");
      return;
    }

    activateAccount(token);
  }, [token]);

  const activateAccount = async (token: string) => {
    try {
      setIsLoading(true);
      const res = await authService.activateAccount(token);
      setStatus("success");
      setMessage(res.message || "Account activated successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.data?.message?.includes("expired")) {
        setStatus("expired");
        return;
      }
      setStatus("error");
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const resendActivation = async () => {
    try {
      setIsLoading(true);
      const res = await authService.resendActivation(email);
      setMessage(res.message || "Activation link sent to your mail");
    } catch {
      setMessage("Failed to resend activation email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-2 bg-primary-main min-vh-100 d-flex justify-content-center align-items-center">
      <div style={styles.container}>
        {status === "loading" && <p>Activating your account… ⏳</p>}

        {status === "success" && (
          <>
            <h2>🎉 Account Activated</h2>
            <p>{message}</p>
            <Link to="/auth/login">Go to Login</Link>
          </>
        )}

        {status === "expired" && (
          <>
            <h2>⏰ Activation Link Expired</h2>
            <p>Enter your email to receive a new activation link.</p>

            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button color="primary my-3" onClick={resendActivation}>
              Resend Activation Email
            </Button>
            {message && <p>{message}</p>}
          </>
        )}

        {status === "error" && (
          <>
            <h2>❌ Activation Failed</h2>
            <p>{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minWidth: "min(500px, 100%)",
    padding: 24,
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
};

export default ActivateAccountForm;
