export function getContrastingTextColor(hex) {
  // Loại bỏ dấu #
  hex = hex.replace("#", "");

  // Chuyển đổi từ hex sang RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Chuyển đổi RGB sang giá trị độ sáng tương đối
  let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Nếu độ sáng tương đối lớn hơn 0.5, sử dụng màu chữ đen, ngược lại sử dụng màu trắng
  return luminance > 0.5 ? "black" : "white";
}
