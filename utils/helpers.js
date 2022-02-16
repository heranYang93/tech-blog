module.exports = {
  format_time: (date) => {
    const reformatedDate =
      date.toLocaleDateString([], {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " at " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return reformatedDate;
  },
};
