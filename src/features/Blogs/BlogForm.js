import React, { Component } from 'react';
import { Formik, Form, FastField } from "formik";
import { isArray } from "lodash";
import * as Yup from "yup";
import { v1 as uuidv1 } from 'uuid';
import { compose } from 'recompose';

import { withCurrentUser } from '../Session';
import { withFirebase } from '../Firebase';
import Button from "../../components/button";
import FormInput from "../../components/FormInput";
import FormTextArea from "../../components/FormTextArea";
import FormFileInput from "../../components/FormFileInput";


const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  subTitle: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const initialValues = {
  title: '',
  subTitle: '',
  description: '',
  photo: null,
  isPublic: true,
  active: false,
}

const fields = [
  {
    name: 'title',
    id: "title",
    placeholder: "Title",
    component: FormInput,
  },
  {
    name: 'subTitle',
    id: "subTitle",
    placeholder: "Sub Title",
    component: FormTextArea,
    rows: 3
  },
  {
    name: 'description',
    id: "description",
    placeholder: "Description",
    component: FormTextArea,
    rows: 10
  },
  {
    name: 'photo',
    id: "photo",
    placeholder: "Select Photo",
    component: FormFileInput,
    selectLimit: 1,
  },
];


class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      disabledButton: false,
      initialValues: {
        ...initialValues,
      }
    };
  }

  componentDidMount() {
    // console.log("==-=-=-props", this.props)
  }

  onSubmit = (values) => {
    const { authUser, firebase } = this.props;
    const uuid = uuidv1();
    const { photo } = values;
    values.createBy = authUser.uid;
    this.setState({ disabledButton: true });
    firebase.blog(uuid).set(values).then(() => {
      if (photo && isArray(photo) && photo.length > 0) {
        this.uploadPhoto(photo[0], uuid).then(url => {
          if (url) {
            firebase.blog(uuid).update({ photo: url });
            this.setState({ disabledButton: false });
          }
        })
      } else {
        this.setState({ disabledButton: false });
      }
    });
  };

  uploadPhoto = (photo, uuid) => {
    const { firebase } = this.props;
    return firebase
      .uploadBlogPhoto(uuid)
      .put(photo)
      .then(() => {
        const mountainImagesRef = firebase.uploadBlogPhoto(uuid);
        return mountainImagesRef.getDownloadURL().then(url => {
          return url;
        }).catch(error => {
          return null;
        })
      })
  }

  render() {
    const { error, initialValues, disabledButton } = this.state;

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
                <Button type="submit" colorType="primary" disabled={disabledButton}>Save</Button>

                {error && <p>{error.message}</p>}
              </Form>
            );
          }}
        />
      </div>
    );
  }
}

export default compose(
  withFirebase,
  withCurrentUser
)(BlogForm);
