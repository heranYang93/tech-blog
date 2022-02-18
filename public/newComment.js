const commentHandler = async (evt) => {
  evt.preventDefault();

  const commentTitle = document.querySelector("#commentTitle").value.trim();
  const commentContent = document.querySelector("#commentContent").value.trim();
  const viewingPostId = document.querySelector("#submitBtn").value.trim();

  if (commentTitle && commentContent) {
    const response = await fetch("/post", {
      method: "POST",
      body: JSON.stringify({ commentTitle, commentContent, viewingPostId }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to post comment");
    }
  }
};

document
  .querySelector(".commentForm")
  .addEventListener("submit", commentHandler);
