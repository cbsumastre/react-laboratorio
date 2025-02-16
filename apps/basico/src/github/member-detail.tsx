import React from "react";
import { Link, useParams } from "react-router-dom";
import { GitHubContext } from "./github-context";
import { AppLayout } from "../layouts/app.layout";
import { router } from "../router";

interface MemberDetailEntity {
  id: string;
  login: string;
  name: string;
  company: string;
  bio: string;
  avatar_url: string;
}

const createDefaultMemberDetail = (): MemberDetailEntity => ({
  id: '',
  login: '',
  name: '',
  company: '',
  bio: '',
  avatar_url: ''
})

export const MemberDetail: React.FC = () => {
  const { id } = useParams();
  const [member, setMember] = React.useState<MemberDetailEntity>(createDefaultMemberDetail());
  const { organization } = React.useContext(GitHubContext);

  React.useEffect(() => {
    fetch(`${process.env.API_GITHUB_URL_BASE}/users/${id}`)
      .then((response) => response.json())
      .then((json) => setMember(json));
  }, []);


  return (
    <AppLayout>
      <div className="github-container-detail">
        <h2>Detail {member.login}</h2>
        <img src={member.avatar_url} />
        <p>{member.name}</p>
        {member.company && <p><span className="label">Work in:</span> <span className="value">{member.company}</span></p>}
        {member.bio && <p><span className="label">Bio:</span> <span className="value">{member.bio}</span></p>}
        <Link to={router.github.list}>Back to Members of {organization}</Link>
      </div>
    </AppLayout>
  );
};
