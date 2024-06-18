import { Container } from "features/page-wrapper/container";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useDeleteProductMutation, useGetProductProfileQuery, useGetProductQuery } from "services/products";
import { Product } from "shared/types/product";
import { getUserId } from "store/userData";


type ProfileProductProps = {
  profileProductCard: Product;
};

export const ProfileProduct = ( {profileProductCard} : ProfileProductProps) => {
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation()
    return (
      <div>
        <div>
        </div>
        <div>
          <Link to={`${ROUTES.PRODUCT}/${profileProductCard.id}`}>
            <h2>{profileProductCard.title}</h2>
          </Link>
          <div>{profileProductCard.category}</div>
  
          <div>
            <span>{profileProductCard.publication_date}</span>
          </div>
          <button onClick={() => {deleteProduct(profileProductCard.id)}}>Удалить</button>
          <Link to={`${ROUTES.EDIT}/${profileProductCard.id}`}>Редактировать</Link>
        </div>
      </div>
    );
}

type ProfileProductListProps = {
  profileProductListCard: Product[];
};

export const Profile = ({profileProductListCard} : ProfileProductListProps) => {
  return (
   <div>
       {profileProductListCard.map((profileProductListCard, index) => (
         <ProfileProduct profileProductCard={profileProductListCard} key={index} />
       ))}
     </div> )}




export const ProfilePage = () => {
  const userId = Number(useSelector(getUserId));
  const { data, isLoading} = useGetProductProfileQuery(userId)

  if (!userId) return <Navigate to={ROUTES.AUTH} />; 
 return (
  <Container>
      {!!data && !isLoading && <Profile profileProductListCard={data}/>}
  </Container>
)
}