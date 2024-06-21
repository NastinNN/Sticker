export const useParsCategory = (category: string) => {

  let parsCategory = "";

  switch (category) {
    case "all":
      parsCategory = "Все";
      break;

    case "cars":
      parsCategory = "Автомобили";
      break;

    case "accessories":
      parsCategory = "Аксессуары";
      break;

    case "furniture":
        parsCategory = "Мебель";
        break;

    case "clothes":
      parsCategory = "Одежда";
      break;

    case "sport":
      parsCategory = "Спорт";
      break;

    case "appliances":
        parsCategory = "Техника";
        break;

    case "household-products":
      parsCategory = "Товары для дома";
      break;

    default:
      parsCategory = category;
  }

  return parsCategory;
}