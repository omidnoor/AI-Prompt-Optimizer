import { Card } from "primereact/card";
import useStore from "store/store";
import styles from "./styles.module.scss";
import ReactMarkdown from "react-markdown";
import { Badge } from "primereact/badge";
import { Chip } from "primereact/chip";
import { useEffect } from "react";

const jobData = {
  title: "Web Developer - 10 hrs/wk - US Only",
  projectDescription:
    "Web Developer - (Part Time) International Data Science and Technology is a business intelligence and technology consulting firm that u..",
  creationDate: "Recently",
  numberOfApplicants: 0,
  connectsRequired: 2,
  projectCost: "Less than 30 hrs/week Intermediate",
  clientLocation: "United States",
  clientHistory: {
    projectsCount: null,
    hireRate: null,
    clientReviews: null,
  },
  jobSuccessScore: "N/A",
  paymentVerified: false,
  memberSince: "N/A",
  sentimentAnalysis: "Neutral",
  clientName: "",
  skillsRequired: [
    "Python",
    "React",
    "MySQL",
    "WordPress",
    "PHP",
    "HTML",
    "CSS",
  ],
};

const Outputs = () => {
  const { messagesList } = useStore();
  useEffect(() => {
    console.log(messagesList);
  }, [messagesList]);
  return (
    <>
      <div className={styles.container_messages}>
        {/* <JobCard jobData={jobData} />, */}
        {!!messagesList && messagesList.length !== 0
          ? messagesList.map((message, index) => (
              <ul key={index}>
                {message.role === "Assistant" && (
                  <li className={styles.message} key={index}>
                    {/* <ReactMarkdown>{message.content}</ReactMarkdown> */}
                    <div
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  </li>
                )}
              </ul>
            ))
          : "No messages to display!"}
      </div>
    </>
  );
};
export default Outputs;

const JobCard = ({ jobData }) => {
  const header = <img alt="Card" src="/path-to-image.jpg" />;

  const footer = (
    <span>
      <Badge
        value={jobData.connectsRequired + " Connects Required"}
        severity="info"
      />
      {jobData.paymentVerified && (
        <Chip label="Payment Verified" icon="pi pi-check" className="ml-2" />
      )}
    </span>
  );

  return (
    <Card
      title={jobData.title}
      subTitle={jobData.clientLocation}
      className={styles.jobCard}
      footer={footer}
      // header={header}
    >
      <p className="m-0" style={{ lineHeight: "1.5" }}>
        <b>Description:</b> {jobData.projectDescription}
      </p>
      <p>
        <b>Skills Required:</b> {jobData?.skillsRequired?.join(", ")}
      </p>
      <p>
        <b>Client History:</b> Projects:
        {jobData.clientHistory.projectsCount || "N/A"}, Hire Rate:
        {jobData.clientHistory.hireRate || "N/A"}, Reviews:
        {jobData.clientHistory.clientReviews || "N/A"}
      </p>
      <p>
        <b>Job Success Score:</b> {jobData.jobSuccessScore}
      </p>
      <p>
        <b>Member Since:</b> {jobData.memberSince}
      </p>
      <p>
        <b>Sentiment Analysis:</b> {jobData.sentimentAnalysis}
      </p>
    </Card>
  );
};
