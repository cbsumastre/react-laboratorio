import React from "react";
import { useNavigate } from "react-router-dom";
import { router } from "../router";

interface MemberEntity {
    id: string;
    login: string;
    avatar_url: string;
  }
  
  type Props = {
    member: MemberEntity;
  }

export const MemberCard: React.FC<Props> = (props) => {
  const { member } = props;
  const navigate = useNavigate();

  const onNavigateToDetail = (login: string) => navigate(router.detailsGithub(login));
  

  return <div className="member-card" onClick={() => onNavigateToDetail(member.login)}>
    <span className="member-name">{member.login}</span>
    <img src={member.avatar_url} alt={member.id} />
  </div>
}