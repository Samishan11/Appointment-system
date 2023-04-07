import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const LoadingSkeleton = ({ count, height, width }) => {
  return (
    <SkeletonTheme baseColor="#BFBFBD" highlightColor="#D9C3D7">
      <p>
        <Skeleton height={height} width={width} count={count} />
      </p>
    </SkeletonTheme>
  );
};
