import React, { useState } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { updateProfile } from "@firebase/auth";
import { authService, storageService } from "../firebaseConfig";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Navigate, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ProfilePhotoWrap = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-sizing: border-box;
  margin-bottom: 20px;
`;
const ProfilePhoto = styled.div<{ profile: string | null | undefined }>`
  width: 100%;
  height: 100%;
  border: 2px solid white;
  background-image: url(${(props) => props.profile});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;
const Update = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-sizing: border-box;
  margin-bottom: 40px;
  position: relative;
`;
const NickName = styled.h4`
  margin-bottom: 20px;
  span {
    font-size: 20px;
    font-weight: 500;
  }
`;
const UpdateBtn = styled.button`
  background-color: ${(props) => props.theme.red.darker};
  color: ${(props) => props.theme.white.lighter};
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 18px;
  &:hover {
    background-color: ${(props) => props.theme.red.normal};
  }
`;

const UpdateForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const UpdateWrap = styled.label`
  width: 100px;
  height: 100px;
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;
`;
const UpdateInput = styled.input`
  padding: 8px 10px;
  background-color: rgba(55, 55, 55.5);
  color: ${(props) => props.theme.white.lighter};
  border: none;
  margin-bottom: 15px;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;
const CancelWrap = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  right: -10px;
  cursor: pointer;
  &:hover > svg {
    color: ${(props) => props.theme.red.normal};
  }
`;
const PlusBtn = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 30px;
  }
`;
const UpdateSubmit = styled.button`
  background-color: ${(props) => props.theme.red.darker};
  color: ${(props) => props.theme.white.lighter};
  border: none;
  font-size: 16px;
  padding: 5px 15px;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => props.theme.red.normal};
  }
`;
interface IUser {
  displayName: string | null;
  uid: string;
  profilePhotoURL: string | null;
  updataProfile: (args: any) => Promise<void>;
}
interface IProfile {
  userObj: IUser | undefined | null;
  refreshUser: () => void;
}
function Profile({ userObj, refreshUser }: IProfile) {
  const navigation = useNavigate();
  const [update, setUpdate] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(userObj?.displayName);
  const [newPhoto, setNewPhoto] = useState<any>(userObj?.profilePhotoURL);
  const [updatingPhoto, setUpdatingPhoto] = useState(false);
  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onFileChange = (event: any) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      }: any = finishedEvent;
      setNewPhoto(result);
      setUpdatingPhoto(true);
    };
    if (theFile) {
      reader.readAsDataURL(theFile);
    }
  };
  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (userObj?.displayName !== newDisplayName) {
      if (authService.currentUser !== null) {
        await updateProfile(authService.currentUser, {
          displayName: newDisplayName,
          // photoURL: newPhotoURL,
        });
      }
    }
    refreshUser();
    setUpdate(false);
    /* let farmet: any = "photo_url";
    let newPhotoURL: any = "";
    if (newPhoto !== "") {
      const newPhotoRef: any = ref(
        storageService,
        `${userObj?.uid}/${uuidv4()}`
      );
      const response = await uploadString(newPhotoRef, newPhoto, farmet);
      newPhotoURL = await getDownloadURL(response.ref);
    }
    if (userObj?.displayName !== newDisplayName) {
      if (userObj?.profilePhotoURL !== newPhoto) {
        if (authService.currentUser !== null) {
          console.log("도착");
          await updateProfile(authService.currentUser, {
            displayName: newDisplayName,
            photoURL: newPhotoURL,
          });
        }
      } else {
        if (authService.currentUser !== null) {
          await updateProfile(authService.currentUser, {
            displayName: newDisplayName,
          });
        }
      }
    } else {
      if (userObj?.profilePhotoURL !== newPhoto) {
        if (authService.currentUser !== null) {
          console.log("사진만");
          await updateProfile(authService.currentUser, {
            photoURL: newPhotoURL,
          });
        }
      }
    } */
  };
  const onUpdate = async () => {
    setUpdate((prev) => !prev);
    if (userObj?.displayName !== newDisplayName) {
      await userObj?.updataProfile({
        displayName: newDisplayName,
      });
    }
  };
  // 프로필 변경 시 취소 버튼
  const onUpdateCancel = () => {
    setNewPhoto(userObj?.profilePhotoURL);
    setUpdatingPhoto(false);
  };
  return (
    <Wrapper>
      {update ? (
        <>
          <input
            type="file"
            id="attach-file"
            accept="image/*"
            onChange={onFileChange}
            style={{ opacity: 0 }}
          />
          <UpdateForm onSubmit={onSubmit}>
            {/* 
              프로필 변경
            updatingPhoto ? (
              <Update>
                <ProfilePhoto profile={newPhoto} />
                <CancelWrap onClick={onUpdateCancel}>
                  <MdCancel />
                </CancelWrap>
              </Update>
            ) : (
              <UpdateWrap htmlFor="attach-file">
                <ProfilePhoto profile={newPhoto} />
                <PlusBtn>
                  <FaPlus />
                </PlusBtn>
              </UpdateWrap>
            )} */}
            <UpdateWrap htmlFor="attach-file">
              <ProfilePhoto profile={newPhoto} />
              {/* <PlusBtn>
                <FaPlus />
              </PlusBtn> */}
            </UpdateWrap>
            <UpdateInput
              type="text"
              onChange={onChange}
              placeholder="닉네임을 입력하시오."
            />
            <UpdateSubmit type="submit" value="Update Profile">
              완료
            </UpdateSubmit>
          </UpdateForm>
        </>
      ) : (
        <>
          <ProfilePhotoWrap>
            <ProfilePhoto profile={newPhoto} />
          </ProfilePhotoWrap>
          <NickName>
            <span>{newDisplayName}</span>님 반갑습니다.
          </NickName>
          <UpdateBtn onClick={onUpdate}>프로필 수정</UpdateBtn>
        </>
      )}
    </Wrapper>
  );
}

export default Profile;
