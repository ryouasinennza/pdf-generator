import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const colors = {
  primary: '#92e8f5',
  secondary: '#f50057',
}

// クラス名指定で変更できます
const CssTextField = withStyles({
  root: {
    '& label.MuiFormLabel-root': {
      color: colors.primary,
    },
    '& label.Mui-focused': {
      borderWidth: 2,
      color: colors.primary,
    },
    '& label.MuiFormLabel-filled': {
      color: colors.secondary,
    },
    '& .MuiInput-underline:after': {
      color: colors.primary,
      borderBottomColor: colors.primary,
    },
    '& .MuiOutlinedInput-root': {
      color: colors.primary,
      '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderWidth: 2,
        borderColor: colors.primary,
      },
      '& fieldset': {
        borderWidth: 2,
        borderColor: colors.primary,
      },
      '&:hover fieldset': {
        borderWidth: 2,
        borderColor: colors.primary,
      },
      '&.Mui-focused fieldset': {
        borderWidth: 2,
        borderColor: colors.primary,
      },
    },
  },
})(TextField);


const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export const OutLineTextFiled = (props) => {

  const classes = useStyles();
  const {
    label,
    type,
    value,
    onChange,
    changeKey,
    disabled,
    style
  } = props
  return (
    <CssTextField
      disabled={disabled}
      value={value}
      type={type}
      onChange={(event) => onChange ? onChange(changeKey, event.target.value) : null}
      className={classes.margin}
      style={style ? style : {}}
      label={label}
      variant="outlined"
    />
  );
}
