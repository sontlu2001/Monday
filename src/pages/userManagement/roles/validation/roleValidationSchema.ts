import * as yup from 'yup';
import { ROLE_TYPES } from '../../constant/role.constant';

export const roleValidationSchema = yup.object().shape({
  name: yup.string().required("Role name is required"),
  description: yup.string(),
  status: yup.boolean(),
  category: yup.number().required("Category is required"),
  type: yup.string().oneOf(Object.values(ROLE_TYPES)).notRequired(),
});
