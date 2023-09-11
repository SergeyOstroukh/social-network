import React from "react"
import { Button, Card, Checkbox, Form, Input } from "antd"
import { useFormik } from "formik"
import { authAPI, LoginParams } from "features/auth/api/authAPI"
import { useSelector } from "react-redux"
import { AppRootStateType } from "app/store"
import { useActions } from "common/hooks/useActions"
import { authThunk } from "features/auth/modal/authSlice"


export const Login = () => {
  const captcha = useSelector<AppRootStateType, null|string>(state => state.auth.captcha)

  const {login} = useActions(authThunk)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: ""
    },
    onSubmit: (values: LoginParams) => {
      login(values)
    }
  })
  const cardStyle = {
    width: 300,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)" // Добавляем тень
  }

  return (
    <Card size="small" style={cardStyle}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={formik.initialValues}
        onFinish={formik.handleSubmit}
        autoComplete="off"
      >
        <Form.Item<LoginParams>
          label="Email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            {...formik.getFieldProps("email")}
          />
        </Form.Item>

        <Form.Item<LoginParams>
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password {...formik.getFieldProps("password")} />
        </Form.Item>

        {captcha &&
          <Form.Item<LoginParams>
            label="captcha"
            rules={[{ required: true, message: "Please input Captcha!" }]}
          >
            <img src={captcha} />
            <Input
              {...formik.getFieldProps("captcha")}
            />
          </Form.Item>
        }


        <Form.Item<LoginParams>
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox {...formik.getFieldProps("rememberMe")}
                    checked={formik.values.rememberMe}>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )


}