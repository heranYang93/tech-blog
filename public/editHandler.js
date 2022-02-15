const editPostHandler = async (evt) => {
  evt.preventDefault();

  const postReviseTitle = document
    .getElementById("postReviseTitle")
    .value.trim();

  const postReviseContent = document
    .getElementById("postReviseContent")
    .value.trim();

  if (postReviseTitle && postReviseContent) {
    const response = await fetch(postReviseEndPt, {
      method: "POST",
      body: JSON.stringify({ postReviseTitle, postReviseContent }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Please try again");
    }
  }
};

document
  .querySelector(".editPostForm")
  .addEventListener("submit", editPostHandler);

const postReviseId = document.getElementById("revisePostBtn").value;
const postReviseEndPt = `/post/mod/${postReviseId}`;
