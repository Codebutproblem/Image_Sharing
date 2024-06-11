import { Skeleton } from "@mui/material";

function SkeletonTable() {
  const array = new Array(12).fill(0);
  return (
    <ul className="pb-5 grid grid-cols-4 gap-3">
      {array.map((_, index) => (
        <li key={index} className="rounded-2xl overflow-hidden">
          <Skeleton variant="rounded" height={200} />
        </li>
      ))}
    </ul>
  );
}

export default SkeletonTable;
