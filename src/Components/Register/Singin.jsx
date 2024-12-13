import { Box, FormControl, FormErrorMessage, Input, Button } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signinAction } from '../../Redux/Auth/Action';
import { getUserProfileAction } from '../../Redux/User/Action';

// Validation schema for form inputs
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Signin = () => {
  // Initial values for the form
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const { user } = useSelector(store => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");

  // Form submission handler
  const handleSubmit = (values, actions) => {
    dispatch(signinAction(values))
    actions.setSubmitting(false);
  };

  const handleNavigate = () => navigate("/signup");

  useEffect(() => {

    if (jwt) dispatch(getUserProfileAction(jwt))

  }, [jwt]);

  useEffect(() => {

    if (user.reqUser?.username) {
      navigate(`/${user.reqUser?.username}`)
    }
  }, [jwt, user.reqUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-pink-400 flex justify-center items-center">
      <Box p={8} w="100%" maxW="md" bg="white" borderRadius="lg" boxShadow="lg">
        <img
          src="https://i.imgur.com/zqpwkLQ.png"
          alt="Logo"
          className="w-24 mx-auto mb-6"
        />

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Form className="space-y-6">
              {/* Email Field */}
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <Input
                      {...field}
                      id="email"
                      placeholder="Mobile Number or Email"
                      size="lg"
                      focusBorderColor="blue.500"
                      borderRadius="md"
                      _focus={{ boxShadow: "0 0 0 2px rgba(66,153,225,0.6)" }}
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Password Field */}
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Password"
                      size="lg"
                      focusBorderColor="blue.500"
                      borderRadius="md"
                      _focus={{ boxShadow: "0 0 0 2px rgba(66,153,225,0.6)" }}
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <p className="text-sm text-center text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, hic?
              </p>

              {/* Submit Button */}
              <Button
                type="submit"
                colorScheme="blue"
                mt={4}
                width="full"
                isLoading={formikProps.isSubmitting}
                borderRadius="md"
                size="lg"
                _hover={{ bg: "blue.600" }}
              >
                Sign In
              </Button>

              <div className="w-full border-t border-slate-300 mt-5">
                <p className="text-center py-2">
                  If you don't have an account,{' '}
                  <span
                    onClick={handleNavigate}
                    className="ml-2 text-blue-700 cursor-pointer"
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default Signin;
