import { Icon } from "@iconify/react";
import React from "react";
import { motion } from "framer-motion";
import C1 from "../../assets/images/SurveyCover.png";
import Cover1Contribution from "../../assets/images/Cover1Contribution.png";
import Cover2Contribution from "../../assets/images/Cover2Contribution.png";
import TemplateContribution from "../../assets/images/TemplateContribution.png";
import { Helmet } from "react-helmet";

const SurveyCard = ({
  title,
  respondents,
  updated,
  used,
  max,
  image,
  status,
}) => {
  return (
    <motion.div
      className="flex flex-row items-center justify-between bg-[#F5F5F5] rounded-r-[16px] pr-[16px] w-full md:w-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-row items-center">
        <div className="relative">
          <img
            src={image}
            alt=""
            className="h-[94px] w-[100%] md:w-[244px] object-cover rounded-l-[16px]"
          />
          <p
            className={`absolute bottom-0 right-0 w-[116px] h-[35px] text-center flex items-center justify-center gap-2 font-inter z-10 text-white text-xs rounded-tl-lg ${
              status === "open"
                ? "bg-[#1F38DB]"
                : status === "closed"
                ? "bg-[#EB221E]"
                : "bg-[#5A5A5A]"
            }`}
          >
            {status === "open" && "Dibuka"}
            {status === "closed" && "Terhenti"}
            {status === "draft" && "Draft"}
          </p>
        </div>
        <div className="px-4 md:px-8">
          <p className="font-bold font-inter text-[16px]">{title}</p>
          <div className="flex flex-row gap-[16px] flex-wrap">
            <div className="flex flex-row items-center gap-2 font-inter">
              <Icon
                icon="material-symbols:person"
                className="text-[13.33px] text-[#595959]"
              />
              <p className="text-[12px]">{respondents} responden</p>
            </div>
            <div className="flex flex-row items-center gap-2 font-inter">
              <Icon
                icon="mdi:clock"
                className="text-[13.33px] text-[#595959]"
              />
              <p className="text-[12px]">{updated}</p>
            </div>
            {used === 0 && max === 0 ? (
              <div className="flex flex-row items-center gap-2 font-inter text-[#595959]">
                <Icon icon="akar-icons:coin" className="text-[13.33px]" />
                <p className="text-[12px]">Belum dialokasikan</p>
              </div>
            ) : (
              <div className={`flex flex-row items-center gap-2 font-inter ${used === max && "text-red-500"}`}>
                <Icon icon="akar-icons:coin" className="text-[13.33px]" />
                <p className="text-[12px]">Terpakai {used} dari {max}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Icon
        icon="bi:three-dots-vertical"
        className="text-[#595959] text-[36px] cursor-pointer hover:bg-zinc-200 rounded-full p-2"
      />
    </motion.div>
  );
};

const ContributionCard = ({ title, updated, coins, image }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-between bg-[#F5F5F5] rounded-2xl w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img src={image} alt="" className="h-[98px] w-full object-cover rounded-t-2xl" />
      <div className="px-6 py-4 flex flex-col items-start justify-start w-full">
        <p className="font-bold font-inter text-[16px]">{title}</p>
        <div className="flex flex-row gap-[16px]">
          <div className="flex flex-row items-center gap-2 font-inter">
            <Icon icon="akar-icons:coin" className="text-[13.33px] text-[#595959]" />
            <p className="text-[12px]">Dapatkan {coins}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  return (
    <div className="w-full bg-white pt-[120px] flex flex-col items-center px-4 md:px-14">
      <div className="flex flex-row items-center justify-center w-full gap-[16px] flex-wrap">
        <motion.button
          className="flex flex-col items-center w-64 py-[24px] px-[56px] text-[#2073DB] border-4 border-[#2073DB] hover:bg-[#2073DB] hover:border-[#2073DB] hover:text-white rounded-[16px]"
          whileHover={{ scale: 1.1 }}
        >
          <Icon icon="ic:outline-plus" className="text-[66px]" />
          <p className="font-inter text-[18px]">Buat Sendiri</p>
        </motion.button>
        <motion.button
          className="flex flex-col items-center w-64 py-[24px] px-[56px] text-white border-4 border-[#2073DB] bg-[#2073DB] hover:bg-[#235ea5] hover:border-[#235ea5] rounded-[16px]"
          whileHover={{ scale: 1.1 }}
        >
          <Icon icon="mingcute:ai-fill" className="text-[66px]" />
          <p className="font-inter text-[18px]">Buat dengan AI</p>
        </motion.button>
      </div>

      <div className="flex flex-col lg:flex-row gap-[14px] items-start justify-start w-full mt-8">
        <div className="w-full py-10 flex flex-col items-start gap-4">
          <div className="w-full">
            <p className="text-[18px] w-full font-inter">Survei Saya</p>
            <p className="text-[12px] w-full text-[#757575] font-inter">
              Lihat data respons atau sunting survei yang sudah Anda buat
            </p>
          </div>
          <div className="flex flex-col gap-[16px] w-full">
            <SurveyCard
              title="Survei Kepuasan Pelanggan"
              respondents={190}
              updated="10 Oktober 2024"
              used={38000}
              max={190000}
              image={C1}
              status={"open"}
            />
            <SurveyCard
              title="Lorem Ipsum"
              respondents={1}
              updated="10 Oktober 2024"
              used={200}
              max={200}
              image={C1}
              status={"closed"}
            />
            <SurveyCard
              title="Lorem Ipsum"
              respondents={190}
              updated="10 Oktober 2024"
              used={0}
              max={0}
              image={C1}
              status={"draft"}
            />
          </div>
        </div>

        <div className="w-full py-10 flex flex-col items-start gap-4">
          <div className="flex flex-row items-center justify-between w-full">
            <div>
              <p className="text-[18px] font-inter">Berkontribusi</p>
              <p className="text-[12px] text-[#757575] font-inter">
                Isi survei yang tersedia dan dapatkan MyPoin
              </p>
            </div>
            <motion.button
              className="bg-[#1F38DB] text-white p-3 rounded-lg flex flex-row gap-2 items-center"
              whileHover={{ scale: 1.05 }}
            >
              <p className="leading-3 text-xs">Eksplor</p>
              <Icon icon="bi:arrow-right-circle-fill" className="text-[16px]" />
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] w-full">
            <ContributionCard
              title="Kamu Tim Android atau iPhone?"
              updated="10 Oktober 2024"
              coins={200}
              image={Cover1Contribution}
            />
            <ContributionCard
              title="Gimana Kebiasaanmu di Perkuliahan?"
              updated="10 Oktober 2024"
              coins={200}
              image={Cover2Contribution}
            />
            <ContributionCard
              title="Lorem ipsum dolor sit amet consectur"
              updated="10 Oktober 2024"
              coins={200}
              image={TemplateContribution}
            />
          </div>
        </div>
      </div>

      <Helmet>
        <title>Dashboard - BeMySample</title>
      </Helmet>
    </div>
  );
};

export default Dashboard;
