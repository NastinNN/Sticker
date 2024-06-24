export const styles = {
  createForm: {
    "& .MuiInputLabel-root": {
      fontFamily: "Jost",
      fontSize: "16px",
      color: "rgb(42,47,55, 0.4)"
    },
    "& .MuiIconButton-root": {
      opacity: "0.2"
    },
    "& .Mui-error": {
      color: "#d32f2f",
    },
    "& .MuiFilledInput-root.Mui-error": {
      borderColor: "#d32f2f",
    },
    "& .MuiFilledInput-root::before": {
      display: "none",
      borderBottomColor: "transparent"
    },
    "& .MuiInputBase-root": {
      backgroundColor: 'rgb(42,47,55, 0.02)',
      fontFamily: "Jost",
      fontSize: "16px",
      border: "1px solid rgb(42,47,55, 0.08)",
      borderRadius: "4px",
    },
    "& .MuiInputBase-root:hover": {
      backgroundColor: 'rgb(42,47,55, 0.06)',
    },
    "& .MuiInputBase-root:focus": {
      backgroundColor: 'rgb(42,47,55, 0.02)',
    },
    "& .MuiInputBase-root:focus-within": {
      backgroundColor: 'rgb(42,47,55, 0.02)',
    },
    "& .MuiInputBase-root:active": {
      backgroundColor: 'rgb(42,47,55, 0.02)',
    },
  },
  
  button: {
      backgroundColor: "#3A95FF",
      color: "#FFFFFF",
      boxShadow: "none",
      fontFamily: "Jost",
      fontSize: "16px",
      textTransform: "capitalize",
      padding: "10px 0",

      "&:hover": {
        backgroundColor: "#166dd0",
        boxShadow: "none",
      },
  }
};