const postDeleteHandler = async (event) => {
  event.preventDefault();

  const response = await fetch(postDeleteRoute, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to delete this comment");
  }
};

const deleteBtn = document.getElementById("deletePost");
const deletePostId = deleteBtn.value;
const postDeleteRoute = `/post/del/${deletePostId}`;
deleteBtn.addEventListener("click", postDeleteHandler);
