export const timeAgo = (createdAt) => {
  const now = new Date();
  const createdTime = new Date(createdAt);
  const diffInSeconds = Math.floor((now - createdTime) / 1000);

  const intervals = [
    { label: "năm", seconds: 31536000 },
    { label: "tháng", seconds: 2592000 },
    { label: "ngày", seconds: 86400 },
    { label: "giờ", seconds: 3600 },
    { label: "phút", seconds: 60 },
  ];

  for (let interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "" : ""} trước`;
    }
  }
  return "Vừa xong";
};
