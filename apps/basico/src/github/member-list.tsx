import React from "react";
import { MemberCard } from "./member-card";
import { GitHubContext } from "./github-context";

export interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const MemberList: React.FC = () => {

  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const { organization, setOrganization } = React.useContext(GitHubContext);
  const [triggerSearch, setTriggerSearch] = React.useState(true)
  const [organizationSearch, setOrganizationSearch] = React.useState("")
  const [notFound, setNotFound] = React.useState(false)

  React.useEffect(() => {
    setMembers([])
    setNotFound(false);
    fetch(`${process.env.API_GITHUB_URL_BASE}/orgs/${organization}/members`)
      .then((response) => {
        if (response.status != 200) {
          throw new Error("Algo ha ido mal");
        }
        return response.json();
      })
      .then((json) => setMembers(json))
      .catch(e => setNotFound(true));
    setOrganizationSearch(organization)
  }, [triggerSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTriggerSearch(!triggerSearch)
    }
  }

  return (
      <div className="github-container">
        {organizationSearch && <h1>Members of {organizationSearch}</h1>}
        <div className="github-form">
          <input type="text" value={organization} onChange={(e) => {
            setNotFound(false);
            setOrganization(e.target.value);
          }} onKeyDown={handleKeyDown} />
          <button onClick={() => {
            setTriggerSearch(!triggerSearch)
          }}>Search</button>
        </div>

        {members && members.length > 0 &&
          <div className="members-container">
            {members?.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        }
        {notFound &&
          <div className="no-members-found">{organization} has no members on github</div>
        }
      </div>
  );
};
