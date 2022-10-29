export type Job = {
  id: number;
  jobType: string;
  department: string;
  company: string;
  country: string;
  slug: string;
  web: string;
};

export type JobProps = {
  jobs: Job[];
};

export type Login = {
  email: string;
  password: string;
};

export type LoginProps = {
  input: Login;
};
