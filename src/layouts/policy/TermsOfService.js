import React from "react";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import { Container, Typography, Box, List, ListItem, Divider } from "@mui/material";

const TermsOfService = () => {
  return (
    <DashboardLayout>
      <MDBox p={3}>
        <DashboardNavbar />
        <MDBox py={2} mx={3}>
          <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
              이용약관
            </Typography>

            <Section title="제1조 (목적)">
              <ListItem>
                본 약관은 한줌(이하 &quot;서비스&quot;)이 제공하는 나눔 플랫폼 관련 제반 서비스의
                이용조건 및 절차, 이용자와 서비스 제공자 간의 권리·의무 및 책임사항을 규정함을
                목적으로 합니다.
              </ListItem>
            </Section>

            <Section title="제2조 (정의)">
              <ListItem>
                &quot;이용자&quot;란 본 서비스에 접속하여 본 약관에 따라 서비스를 이용하는 자를
                말합니다.
              </ListItem>
              <ListItem>
                &quot;나눔글&quot;이란 이용자가 서비스 내에서 게시하는 재사용 가능 물품에 대한 정보
                게시물을 말합니다.
              </ListItem>
              <ListItem>
                &quot;신청자&quot;란 나눔글에 대해 수령을 요청한 이용자를 말합니다.
              </ListItem>
              <ListItem>
                &quot;플랫폼 운영자&quot;란 본 서비스를 개발·운영·관리하는 주체를 의미합니다.
              </ListItem>
            </Section>

            <Section title="제3조 (약관의 효력 및 변경)">
              <ListItem>본 약관은 서비스 화면에 게시함으로써 효력이 발생합니다.</ListItem>
              <ListItem>
                플랫폼 운영자는 필요 시 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수 있으며,
                개정 시 최소 7일 전 서비스 화면을 통해 공지합니다.
              </ListItem>
              <ListItem>
                이용자는 개정된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.
              </ListItem>
            </Section>

            <Section title="제4조 (서비스 이용 및 제한)">
              <ListItem>
                본 서비스는 한동대학교 재학생, 교직원, 교수 등 학교 구성원을 대상으로 제공됩니다.
              </ListItem>
              <ListItem>
                이용자는 Hisnet 인증을 통해 본인의 자격을 증명해야 하며, 타인의 정보를 도용하여
                사용할 수 없습니다.
              </ListItem>
              <ListItem>
                이용자는 나눔을 통해 금전적 거래, 광고, 상업적 활동 등을 해서는 안 됩니다.
              </ListItem>
              <ListItem>
                운영자는 시스템 안정성 확보, 점검, 공공질서 유지 등의 사유로 서비스 이용을
                일시적으로 제한할 수 있습니다.
              </ListItem>
            </Section>

            <Section title="제5조 (이용자의 의무)">
              <ListItem>허위 정보 또는 타인의 정보를 무단으로 사용하는 행위</ListItem>
              <ListItem>나눔을 빙자한 금전 거래 또는 유료 판매 행위</ListItem>
              <ListItem>타인에게 불쾌감을 주는 메시지, 리뷰, 비방 등 비윤리적 행위</ListItem>
              <ListItem>플랫폼의 운영을 방해하거나 시스템에 악영향을 미치는 행위</ListItem>
              <ListItem>
                이용자는 공동체의 일원으로서 서비스의 취지(나눔과 섬김)를 존중하며, 건전한 커뮤니티
                문화를 유지할 책임이 있습니다.
              </ListItem>
            </Section>

            <Section title="제6조 (운영자의 권리 및 책임)">
              <ListItem>
                운영자는 본 약관을 위반한 이용자에 대해 경고, 일정 기간 이용 제한, 강제 탈퇴 등의
                조치를 취할 수 있습니다.
              </ListItem>
              <ListItem>
                운영자는 서비스 운영을 위한 최소한의 범위 내에서 이용자 정보를 수집, 보관하며,
                개인정보보호법을 준수합니다.
              </ListItem>
              <ListItem>
                운영자는 서비스 이용 중 발생한 직접적인 분쟁에 대해 개입하지 않으나, 필요 시 조정할
                수 있습니다.
              </ListItem>
            </Section>

            <Section title="제7조 (지적재산권)">
              <ListItem>
                서비스 내의 저작물, 디자인, 코드 등 일체의 콘텐츠에 대한 권리는 플랫폼 운영자에게
                있으며, 이용자는 이를 무단 복제, 배포, 전송, 전시할 수 없습니다.
              </ListItem>
            </Section>

            <Section title="제8조 (면책조항)">
              <ListItem>
                운영자는 천재지변, 기술적 장애, 불가항력 사유로 인해 발생한 서비스 중단에 대해
                책임을 지지 않습니다.
              </ListItem>
              <ListItem>
                나눔 과정에서 발생하는 물품의 하자, 분실, 수령 거부 등은 당사자 간의 책임이며,
                운영자는 법적 책임을 지지 않습니다.
              </ListItem>
            </Section>

            <Section title="제9조 (약관 외 준칙)">
              <ListItem>
                본 약관에서 정하지 않은 사항은 대한민국 관련 법령 및 일반 상관례에 따릅니다.
              </ListItem>
            </Section>

            <Box mt={4}>
              <Typography variant="body2" color="textSecondary">
                부칙: 본 약관은 2025년 6월 1일부터 시행됩니다.
              </Typography>
            </Box>
          </Container>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
};

// eslint-disable-next-line react/prop-types
const Section = ({ title, children }) => (
  <Box my={4}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <List>{children}</List>
    <Divider sx={{ mt: 2 }} />
  </Box>
);

export default TermsOfService;
