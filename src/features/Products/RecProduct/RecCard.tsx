import { Product } from "shared/types/product"

import s from "./recProduct.module.css"
import { Link } from "react-router-dom"
import { ROUTES } from "router/routes"

type RecCardProps = {
  product: Product
}

export const RecCard = ({product}: RecCardProps) => {
  return (
    <>
    <Link to={`${ROUTES.PRODUCT}?id=${product.id}`} className={s.card}>
      <div className={s.image}>
        <img src={product.image} alt="Rec Image"/>
      </div>
      <p className={s.desc}>{product.title}</p>
    </Link>
    </>
  )
}