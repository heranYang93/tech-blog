const newPostHandler = async (evt) => {
  evt.preventDefault();
  const postTitle = document.getElementById("newPostTitle").value.trim();
  const postContent = document.getElementById("newPostContent").value.trim();

  if (postTitle && postContent) {
    const response = await fetch("/", {
      method: "POST",
      body: JSON.stringify({ postTitle, postContent }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Please complete the field and post again");
    }
  }
};

document
  .querySelector(".newPostForm")
  .addEventListener("submit", newPostHandler);
