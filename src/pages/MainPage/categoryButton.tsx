import classes from "classnames"

import s from "./main.module.css"

type Category = {
  name: string
}

type CategoryList = {
  categories: string[],
  stateCategory: string;
  setStateCategory: any,
  pars: any
}

export const CategoryButton = ({categories, stateCategory, setStateCategory, pars}: CategoryList) => {
  return (
    <>
    {categories.map((category, index) => (
      <button type='button' key={index} onClick={() => {setStateCategory(category)}} className={stateCategory === category ? classes(s.buttonCategory, s.buttonCategoryActive) : s.buttonCategory}>{pars(category)}</button>
    ))}
  </>
  )
}