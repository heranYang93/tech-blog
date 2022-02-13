const logoutRoute = "/user/logout";

const logoutHandler = async (evt) => {
  evt.preventDefault();

  const response = await fetch(logoutRoute, {
    method: "POST",
    body: {},
  });
  if (response.ok) {
    document.location.reload();
  }
};

document.querySelector(".logout").addEventListener("click", logoutHandler);
