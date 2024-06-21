import { Product } from "shared/types/product";
import { ProfileProductCard } from "../ProfileProductCard";

type ProfileProductListProps = {
  profileProductList: Product[];
};

export const ProfileProductList = ({ profileProductList }: ProfileProductListProps) => {
  return (
    <>
      {profileProductList.map((profileProductList, index) => (
        <ProfileProductCard profileProductCard={profileProductList} key={index} />
      ))}
    </>
  );
};