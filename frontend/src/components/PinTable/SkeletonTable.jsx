import { Skeleton } from "@mui/material";

function SkeletonTable({col, row}) {
  const array = new Array(col*row).fill(0);
  return (
    <ul className={`pb-5 grid grid-cols-${col} gap-3`}>
      {array.map((_, index) => (
        <li key={index} className="rounded-2xl overflow-hidden">
          <Skeleton variant="rounded" height={200} />
        </li>
      ))}
    </ul>
  );
}

export default SkeletonTable;
