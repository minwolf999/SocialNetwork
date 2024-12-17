PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS JoinGroupRequest (
	UserId VARCHAR(36) NOT NULL,
	GroupId VARCHAR(36) NOT NULL,

	CONSTRAINT fk_userid FOREIGN KEY (UserId) REFERENCES "UserInfo"("Id") ON DELETE CASCADE,
	CONSTRAINT fk_followerid FOREIGN KEY (GroupId) REFERENCES "Groups"("Id") ON DELETE CASCADE
)