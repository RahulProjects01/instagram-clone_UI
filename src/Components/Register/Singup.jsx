import {
    Box,
    FormControl,
    FormErrorMessage,
    Input,
    Button,
    useToast,
  } from "@chakra-ui/react";
  import { Formik, Form, Field } from "formik";
  import * as Yup from "yup";
  import React, { useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { signupAction } from "../../Redux/Auth/Action";
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    name: Yup.string()
      .min(3, "Full Name must be at least 3 characters")
      .required("Full Name is required"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  
  const Signup = () => {
    const initialValues = { email: "", name: "", username: "", password: "" };
    const navigate = useNavigate();
    const { auth } = useSelector((store) => store);
    const dispatch = useDispatch();
    const toast = useToast();
  
    const handleSubmit = (values, actions) => {
      console.log("Submitted values: ", values);
      dispatch(signupAction(values));
      actions.setSubmitting(false);
    };
  
    useEffect(() => {
      if (auth.signup?.username) {
        navigate("/login");
        toast({
          title: `Account created: ${auth.signup?.username}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    }, [auth.signup]);
  
    const handleNavigate = () => navigate("/login");
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-teal-400 flex justify-center items-center">
        <Box
          p={8}
          w="100%"
          maxW="lg"
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
        >
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
              <Form className="space-y-8">
                {/* Email Field */}
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <Input
                        {...field}
                        id="email"
                        placeholder="Email"
                        size="lg"
                        focusBorderColor="blue.500"
                        borderRadius="md"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
  
                {/* Full Name Field */}
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <Input
                        {...field}
                        id="name"
                        placeholder="Full Name"
                        size="lg"
                        focusBorderColor="blue.500"
                        borderRadius="md"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
  
                {/* Username Field */}
                <Field name="username">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                    >
                      <Input
                        {...field}
                        id="username"
                        placeholder="Username"
                        size="lg"
                        focusBorderColor="blue.500"
                        borderRadius="md"
                      />
                      <FormErrorMessage>{form.errors.username}</FormErrorMessage>
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
                      />
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
  
                {/* Submit Button */}
                <Button
                  type="submit"
                  colorScheme="blue"
                  mt={4}
                  width="full"
                  isLoading={formikProps.isSubmitting}
                  borderRadius="md"
                  size="lg"
                >
                  Sign Up
                </Button>
  
                <div className="w-full border-t border-slate-300 mt-5">
                  <p className="text-center py-2">
                    Already have an account?{" "}
                    <span
                      onClick={handleNavigate}
                      className="ml-2 text-blue-700 cursor-pointer"
                    >
                      Sign In
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
  
  export default Signup;
  