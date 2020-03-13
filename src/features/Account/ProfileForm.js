import React, { Component } from 'react';
import { Formik, Form, FastField } from "formik";
import { isArray } from "lodash";
import * as Yup from "yup";

import { withFirebase } from '../Firebase';
import Button from "../../components/button";
import FormInput from "../../components/FormInput";
import FormTextArea from "../../components/FormTextArea";
import FormFileInput from "../../components/FormFileInput";


const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  summary: Yup.string().required("Required"),
});

const initialValues = {
  fullName: '',
  summary: '',
  avatar: null
}

const fields = [
  {
    name: 'fullName',
    id: "fullName",
    placeholder: "Full Name",
    component: FormInput,
  },
  {
    name: 'email',
    id: "email",
    placeholder: "Email",
    component: FormInput,
    disabled: true,
  },
  {
    name: 'summary',
    id: "summary",
    placeholder: "Summary",
    component: FormTextArea,
    rows: 5
  },
  {
    name: 'avatar',
    id: "avatar",
    placeholder: "Select Avatar",
    component: FormFileInput,
    selectLimit: 1,
  },
];


class ProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      initialValues: {
        ...initialValues,
        fullName: props.authUser.fullName,
        summary: props.authUser.summary,
        email: props.authUser.email,
        avatar: props.authUser.avatar,
      }
    };
  }

  onSubmit = (values) => {
    const { avatar } = values;
    const { authUser } = this.props;
    if (avatar && isArray(avatar) && avatar.length > 0) {
      this.uploadAvatar(avatar[0]).then(url => {
        if (url) {
          values.avatar = url;
        }
        this.saveProfile(values);
      })
    } else {
      delete values.avatar;

      this.saveProfile(values);
    }
  };

  saveProfile = datas => {
    const { authUser, firebase } = this.props;
    firebase.user(authUser.uid).update(datas).then(() => {
      authUser.updateGlobalProfile();
    });
  }

  uploadAvatar = (avatar) => {
    const { authUser, firebase } = this.props;
    return firebase
      .uploadUserAvatar(authUser.uid)
      .put(avatar)
      .then(() => {
        const mountainImagesRef = firebase.uploadUserAvatar(authUser.uid);
        return mountainImagesRef.getDownloadURL().then(url => {
          return url;
        }).catch(error => {
          return null;
        })
      })
  }

  getAvatarUrl = () => {
    const { authUser, firebase } = this.props;
    const mountainImagesRef = firebase.uploadUserAvatar(authUser.uid);
    return mountainImagesRef.getDownloadURL()
      .then(function (url) {
        return url;
      })
      .catch(function (error) {
        return null;
      })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { error, initialValues } = this.state;

    return (
      <div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
          render={({ dirty, values, ...other }) => {
            return (
              <Form>
                {
                  fields.map((v, k) => <FastField key={k} {...v} className="mb-3" />)
                }
                <Button type="submit" colorType="primary">Save</Button>

                {error && <p>{error.message}</p>}
              </Form>
            );
          }}
        />
      </div>
    );
  }
}

export default withFirebase(ProfileForm);
