import React from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import { navbarIconButton } from "../../examples/Navbars/DashboardNavbar/styles";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

function ChatField() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox position="relative">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <MDBox p={2}>
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <Icon>arrow_back_ios_icon</Icon>
                </IconButton>
              </MDBox>
              <MainContainer style={{ width: "100%", height: "550px" }}>
                <ChatContainer>
                  <MessageList>
                    <Message
                      model={{
                        message: "안녕",
                        direction: "incoming",
                        position: "first",
                      }}
                    />
                    <Message
                      model={{
                        message: "나도 안녕",
                        direction: "outgoing",
                        position: "first",
                      }}
                    />
                  </MessageList>
                  <MessageInput placeholder="메세지 작성" />
                </ChatContainer>
              </MainContainer>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ChatField;
