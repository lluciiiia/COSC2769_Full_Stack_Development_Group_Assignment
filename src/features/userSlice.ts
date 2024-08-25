import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../app/store";
import { UserType } from "../interfaces/Users";

const initialState: UserType[] = [
  {
    id: 1,
    name: "Tai Ngo",
    dateJoined: new Date("2006-10-13"),
    email: "testing@gmail.com",
    password: "123",
    profilePictureURL: "https://example.com/tai-ngo.jpg",
    introduction: "I am a Software Engineering Student",
    address: "District 7, Ho Chi Minh",
    age: 20,
    activeStatus: true,
    education: "RMIT University",
    location: "HCMC, Vietnam",
    phoneNumber: "09991113233",
    relationship: "In a relationship",
    job: "Tech Innovators",
    jobDescription:
      "I have been working at Tech Innovators for five years as a software engineer. During this time, I have developed several key projects that improved our product’s efficiency and user experience. My role involves designing, coding, and testing software, as well as collaborating with cross-functional teams to deliver high-quality solutions.",
    degree: "Bachelor of Science in Computer Science",
    years: "2022-2026",
    educationDescription:
      "Completed coursework in software engineering, data structures, and algorithms. Participated in research on artificial intelligence.",
    inRelationship: "Alex",
    Bio: "hi Im Tai Ngo Im a Software Engineering student at RMIT University and a software engineer at Tech Innovators",
  },
  {
    id: 2,
    name: "Nguyen An",
    dateJoined: new Date("2015-05-20"),
    email: "nguyen.an@gmail.com",
    password: "password2",
    profilePictureURL: "https://example.com/nguyen-an.jpg",
    introduction: "I am an IT Student passionate about cybersecurity.",
    address: "District 1, Ho Chi Minh",
    age: 22,
    activeStatus: true,
    education: "Ton Duc Thang University",
    location: "HCMC, Vietnam",
    phoneNumber: "0909333222",
    relationship: "Single",
    job: "Intern at Tech Solutions",
    jobDescription:
      "As an intern at Tech Solutions, I assist in the development and testing of software applications, focusing on security features and performance optimization.",
    degree: "Bachelor of Information Technology",
    years: "2020-2024",
    educationDescription:
      "Engaged in coursework on cybersecurity, network administration, and database management. Participated in a project on enhancing network security in corporate environments.",
    inRelationship: undefined,
    Bio: "hi Im Tai Ngo Im a Software Engineering student at RMIT University and a software engineer at Tech Innovators",
  },
  {
    id: 3,
    name: "Le Thi Hoa",
    dateJoined: new Date("2018-08-15"),
    email: "le.hoa@gmail.com",
    password: "password3",
    profilePictureURL: "https://example.com/le-thi-hoa.jpg",
    introduction: "I am a data science enthusiast and student.",
    address: "District 3, Ho Chi Minh",
    age: 23,
    activeStatus: false,
    education: "University of Science",
    location: "HCMC, Vietnam",
    phoneNumber: "0911223344",
    relationship: "Married",
    job: "Junior Data Analyst",
    jobDescription:
      "I work as a Junior Data Analyst, focusing on data visualization, statistical analysis, and machine learning models to help our company make data-driven decisions.",
    degree: "Bachelor of Data Science",
    years: "2017-2021",
    educationDescription:
      "Completed advanced courses in machine learning, big data, and statistical analysis. Conducted research on predictive analytics for healthcare.",
    inRelationship: "Minh",
    Bio: "hi Im Tai Ngo Im a Software Engineering student at RMIT University and a software engineer at Tech Innovators",
  },
  {
    id: 4,
    name: "Pham Van Long",
    dateJoined: new Date("2020-01-10"),
    email: "pham.long@gmail.com",
    password: "password4",
    profilePictureURL: "https://example.com/pham-van-long.jpg",
    introduction:
      "I am a full-stack developer with a focus on front-end technologies.",
    address: "District 10, Ho Chi Minh",
    age: 24,
    activeStatus: true,
    education: "FPT University",
    location: "HCMC, Vietnam",
    phoneNumber: "0909556677",
    relationship: "In a relationship",
    job: "Full-Stack Developer at InnovateTech",
    jobDescription:
      "My role involves building and maintaining web applications, collaborating with designers and backend developers to create seamless user experiences.",
    degree: "Bachelor of Software Engineering",
    years: "2016-2020",
    educationDescription:
      "Studied full-stack development, focusing on modern frameworks like React and Node.js. Developed a capstone project on building scalable web applications.",
    inRelationship: "Lan",
    Bio: "hi Im Tai Ngo Im a Software Engineering student at RMIT University and a software engineer at Tech Innovators",
  },
  {
    id: 5,
    name: "Tran Thi Lan",
    dateJoined: new Date("2019-11-25"),
    email: "tran.lan@gmail.com",
    password: "password5",
    profilePictureURL: "https://example.com/tran-thi-lan.jpg",
    introduction: "I am a graphic designer who loves creating digital art.",
    address: "District 2, Ho Chi Minh",
    age: 21,
    activeStatus: true,
    education: "University of Fine Arts",
    location: "HCMC, Vietnam",
    phoneNumber: "0909887766",
    relationship: "Single",
    job: "Graphic Designer at Creative Studio",
    jobDescription:
      "I design digital artwork, including branding materials, social media graphics, and UI/UX designs for various clients.",
    degree: "Bachelor of Fine Arts",
    years: "2018-2022",
    educationDescription:
      "Completed coursework in graphic design, digital illustration, and visual communication. Led a project on redesigning the UI for a mobile application.",
    inRelationship: undefined,
    Bio: "hi Im Tai Ngo Im a Software Engineering student at RMIT University and a software engineer at Tech Innovators",
  },
  {
    id: 6,
    name: "Mai Thi Kim",
    dateJoined: new Date("2023-06-01"),
    email: "mai.kim@gmail.com",
    password: "password6",
    profilePictureURL: "https://example.com/mai-thi-kim.jpg",
    introduction: "I am a machine learning researcher.",
    address: "District 5, Ho Chi Minh",
    age: 25,
    activeStatus: true,
    education: "Hanoi University of Science and Technology",
    location: "HCMC, Vietnam",
    phoneNumber: "0909112233",
    relationship: "Single",
    job: "Machine Learning Engineer at AI Labs",
    jobDescription:
      "I focus on developing machine learning algorithms and models for various applications, including natural language processing and computer vision.",
    degree: "Master of Science in Artificial Intelligence",
    years: "2021-2023",
    educationDescription:
      "Conducted advanced research in AI techniques and their applications. Published papers on improving model accuracy and efficiency.",
    inRelationship: undefined,
    Bio: "hi Im Tai Ngo Im a Software Engineering student at RMIT University and a software engineer at Tech Innovators",
  },
  {
    id: 7,
    name: "Hoang Minh Tuan",
    dateJoined: new Date("2022-02-14"),
    email: "hoang.tuan@gmail.com",
    password: "password7",
    profilePictureURL: "https://example.com/hoang-minh-tuan.jpg",
    introduction: "I am a software developer with a passion for gaming.",
    address: "District 8, Ho Chi Minh",
    age: 26,
    activeStatus: true,
    education: "Danang University of Science and Technology",
    location: "HCMC, Vietnam",
    phoneNumber: "0909445566",
    relationship: "In a relationship",
    job: "Software Developer at GameDev Studio",
    jobDescription:
      "I work on developing and optimizing video games, focusing on both gameplay mechanics and graphics.",
    degree: "Bachelor of Game Development",
    years: "2016-2020",
    educationDescription:
      "Studied game design, programming, and interactive media. Developed several indie games as personal projects.",
    inRelationship: "Thu",
    Bio: "hi Im Tai Ngo Im a Software Engineering student at RMIT University and a software engineer at Tech Innovators",
  },
  {
    id: 8,
    name: "Ngoc Thi Lan",
    dateJoined: new Date("2023-01-22"),
    email: "ngoc.lan@gmail.com",
    password: "password8",
    profilePictureURL: "https://example.com/ngoc-thi-lan.jpg",
    introduction: "I am a digital marketing specialist.",
    address: "District 6, Ho Chi Minh",
    age: 29,
    activeStatus: true,
    education: "University of Economics Ho Chi Minh City",
    location: "HCMC, Vietnam",
    phoneNumber: "0909557788",
    relationship: "Married",
    job: "Digital Marketing Specialist at MarketMasters",
    jobDescription:
      "I create and manage digital marketing campaigns, analyze marketing metrics, and work to enhance the online presence of our clients.",
    degree: "Bachelor of Marketing",
    years: "2012-2016",
    educationDescription:
      "Completed coursework in digital marketing strategies, data analysis, and consumer behavior. Managed campaigns that increased client engagement.",
    inRelationship: "Hieu",
    Bio: "hi Im Tai Ngo Im a Software Engineering student at RMIT University and a software engineer at Tech Innovators",
  },
  {
    id: 9,
    name: "Vu Thi Thanh",
    dateJoined: new Date("2022-10-11"),
    email: "vu.thanh@gmail.com",
    password: "password9",
    profilePictureURL: "https://example.com/vu-thi-thanh.jpg",
    introduction: "I am a UX/UI designer focused on user-centered design.",
    address: "District 4, Ho Chi Minh",
    age: 27,
    activeStatus: true,
    education: "University of Architecture",
    location: "HCMC, Vietnam",
    phoneNumber: "0909666777",
    relationship: "Married",
    job: "UX/UI Designer at DesignHub",
    jobDescription:
      "I design user interfaces and experiences for web and mobile applications, ensuring a seamless and intuitive user journey.",
    degree: "Bachelor of Design",
    years: "2014-2018",
    educationDescription:
      "Completed studies in user experience design, interaction design, and visual communication. Led a project on redesigning an e-commerce platform.",
    inRelationship: "Nhat",
    Bio: "hi Im Tai Ngo Im a Software Engineering student at RMIT University and a software engineer at Tech Innovators",
  },
  {
    id: 10,
    name: "Do Thi Bao",
    dateJoined: new Date("2023-03-19"),
    email: "do.bao@gmail.com",
    password: "password10",
    profilePictureURL: "https://example.com/do-thi-bao.jpg",
    introduction:
      "I am a project manager with a background in software development.",
    address: "District 9, Ho Chi Minh",
    age: 30,
    activeStatus: true,
    education: "University of Danang",
    location: "HCMC, Vietnam",
    phoneNumber: "0909888877",
    relationship: "Single",
    job: "Project Manager at DevWorks",
    jobDescription:
      "I oversee software development projects, manage timelines, coordinate with teams, and ensure project goals are met efficiently.",
    degree: "Master of Project Management",
    years: "2015-2017",
    educationDescription:
      "Studied advanced project management techniques, risk management, and leadership. Managed multiple successful software projects.",
    inRelationship: undefined,
    Bio: "hi Im Tai Ngo Im a Software Engineering student at RMIT University and a software engineer at Tech Innovators",
  },
  {
    id: 11,
    name: "Phan Thi My",
    dateJoined: new Date("2022-07-30"),
    email: "phan.my@gmail.com",
    password: "password11",
    profilePictureURL: "https://example.com/phan-thi-my.jpg",
    introduction:
      "I am a business analyst with expertise in data-driven decision making.",
    address: "District 12, Ho Chi Minh",
    age: 28,
    activeStatus: true,
    education: "Hochiminh City University of Technology",
    location: "HCMC, Vietnam",
    phoneNumber: "0909777666",
    relationship: "In a relationship",
    job: "Business Analyst at InsightAnalytics",
    jobDescription:
      "I analyze business data to provide insights and recommendations, working closely with stakeholders to drive strategic decisions.",
    degree: "Bachelor of Business Analytics",
    years: "2014-2018",
    educationDescription:
      "Focused on data analysis, statistical methods, and business intelligence. Led several analytics projects that improved business outcomes.",
    inRelationship: "Hoang",
    Bio: "hi Im Tai Ngo Im a Software Engineering student at RMIT University and a software engineer at Tech Innovators",
  },
  {
    id: 12,
    name: "Nguyen Thi Huong",
    dateJoined: new Date("2024-02-10"),
    email: "nguyen.huong@gmail.com",
    password: "password12",
    profilePictureURL: "https://example.com/nguyen-thi-huong.jpg",
    introduction:
      "I am an environmental engineer passionate about sustainability.",
    address: "District 11, Ho Chi Minh",
    age: 32,
    activeStatus: true,
    education: "University of Natural Sciences",
    location: "HCMC, Vietnam",
    phoneNumber: "0909666888",
    relationship: "Married",
    job: "Environmental Engineer at EcoSolutions",
    jobDescription:
      "I work on projects aimed at improving environmental sustainability, including waste management, water treatment, and green energy solutions.",
    degree: "Master of Environmental Engineering",
    years: "2012-2014",
    educationDescription:
      "Specialized in environmental impact assessments, sustainable development, and renewable energy. Managed several large-scale sustainability projects.",
    inRelationship: "Tuan",
    Bio: "hi Im Tai Ngo Im a Software Engineering student at RMIT University and a software engineer at Tech Innovators",
  },
  {
    id: 13,
    name: "Le Thi Mai",
    dateJoined: new Date("2024-05-05"),
    email: "le.mai@gmail.com",
    password: "password13",
    profilePictureURL: "https://example.com/le-thi-mai.jpg",
    introduction:
      "I am a mobile app developer with a focus on cross-platform solutions.",
    address: "District 7, Ho Chi Minh",
    age: 29,
    activeStatus: true,
    education: "Saigon University",
    location: "HCMC, Vietnam",
    phoneNumber: "0909333444",
    relationship: "Single",
    job: "Mobile App Developer at AppMasters",
    jobDescription:
      "I develop cross-platform mobile applications using technologies like Flutter and React Native, ensuring high performance and user satisfaction.",
    degree: "Bachelor of Mobile Application Development",
    years: "2015-2019",
    educationDescription:
      "Studied mobile app development, UI/UX design for mobile, and software engineering principles. Created several successful apps with high user ratings.",
    inRelationship: undefined,
    Bio: undefined,
  },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Existing reducers
    changePassword(state, action) {
      const { id, newPassword } = action.payload;
      const user = state.find((u) => u.id === id);
      if (user) {
        user.password = newPassword;
      }
    },
    updateUser(state, action) {
      const updatedUser = action.payload;
      const index = state.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        state[index] = updatedUser;
      }
    },
  },
});

export const { updateUser } = userSlice.actions;

//set single user (return UserType or undefined when cannot find)
export const getUserById = (
  state: AppState,
  id: number,
): UserType | undefined => {
  const user = state.users.find((u: UserType) => {
    return u.id === id;
  });

  return user;
};

export default userSlice.reducer;
