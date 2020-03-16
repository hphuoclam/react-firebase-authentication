import moment from "moment";

interface BlogType {
  title: string,
  subTitle: string,
  description: string,
  photo: any,
  isPublic: boolean,
  active: boolean,
  createdAt: number,
  updatedAt: number,
}

// convert current time to timestramp
const currentTimestamp = moment().valueOf();

const blogInitial: BlogType = {
  title: '',
  subTitle: '',
  description: '',
  photo: null,
  isPublic: false,
  active: true,
  createdAt: currentTimestamp,
  updatedAt: currentTimestamp,
}

export {
  BlogType,
  blogInitial
}