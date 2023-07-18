import AppRouter from "components/Router";
import { useEffect, useState } from "react";
import { authService, onAuthStateChanged, updateProfile } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: () =>
            updateProfile(user, { displayName: user.displayName }),
        });
        // setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj(
      {
        displayName: user.displayName,
        uid: user.uid,
      }
      // Object.assign({}, user)
    );
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={userObj}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      <footer
        style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
      >
        &copy; {new Date().getFullYear()} Nwitter
      </footer>
    </>
  );
}

export default App;
