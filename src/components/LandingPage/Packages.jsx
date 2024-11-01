import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const featuresList = [
  "Membuat survei",
  "Publikasi survei",
  "Dashboard analisis hasil survei",
  "Anti-spam dan validasi respons",
  "MyPoin diberikan per bulan",
  "Naikkan eksposur",
  "Bantuan AI",
  "Layanan pelanggan",
];

const translations = {
  en: {
    freePackage: "Free Package",
    premiumPackage: "Premium Package",
    plusPackage: "Plus Package",

    choiceForYou: "Choice for You",
    variousOptions: "Various options to suit your needs",

    makeSurvey: "Make survey",
    publishSurvey: "Publish survey",
    surveyAnalysisDashboard: "Survey analysis dashboard",
    antiSpamValidation: "Anti-spam and response validation",
    myPoinPerMonth: "MyPoin given per month",
    increaseExposure: "Increase exposure",
    aiAssistance: "AI assistance",
    customerService: "Customer service",
    month: "/month",
    csPlusPackage: "Phone, E-mail, Live Chat",

    subscribeNow: "Subscribe Now",
  },
  id: {
    freePackage: "Paket Gratis",
    premiumPackage: "Paket Premium",
    plusPackage: "Paket Plus",

    choiceForYou: "Pilihan untuk Anda",
    variousOptions: "Berbagai pilihan untuk disesuaikan dengan kebutuhan",

    makeSurvey: "Membuat survei",
    publishSurvey: "Publikasi survei",
    surveyAnalysisDashboard: "Dashboard analisis hasil survei",
    antiSpamValidation: "Anti-spam dan validasi respons",
    myPoinPerMonth: "MyPoin diberikan per bulan",
    increaseExposure: "Naikkan eksposur",
    aiAssistance: "Bantuan AI",
    customerService: "Layanan pelanggan",
    month: "/bulan",
    csPlusPackage: "Telepon, E-mail, Live Chat",

    subscribeNow: "Berlangganan Sekarang",
  },
};

const Packages = ({ language }) => {
  const packagesData = [
    {
      name: translations[language].freePackage,
      price: language === "en" ? "Free" : "Gratis",
      perMonth: "",
      bgColor: "",
      features: [true, true, true, true, "0", false, false, "E-mail"],
    },
    {
      name: translations[language].premiumPackage,
      price: language === "en" ? "IDR20.000" : "Rp20.000",
      perMonth: translations[language].month,
      bgColor: "bg-[#2073DB]",
      altBgColor: "bg-[#1E63BC]",
      features: [
        true,
        true,
        true,
        true,
        "100",
        true,
        true,
        "E-mail, Live Chat",
      ],
    },
    {
      name: translations[language].plusPackage,
      price: language === "en" ? "IDR120.000" : "Rp120.000",
      perMonth: translations[language].month,
      bgColor: "",
      features: [
        true,
        true,
        true,
        true,
        "1000",
        true,
        true,
        translations[language].csPlusPackage,
      ],
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center w-full py-20 gap-[49px] px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <p className="text-[45px] text-center">
          {translations[language].choiceForYou}
        </p>
        <p className="text-[16pt] text-center">
          {translations[language].variousOptions}
        </p>
      </motion.div>

      <div className="w-full font-poppins px-4 md:px-20">
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-w-full table-auto"
        >
          <thead>
            <tr>
              <th className="p-2 md:p-4 text-left"></th>
              {packagesData.map((pkg, index) => (
                <th
                  key={index}
                  className={`relative p-2 md:p-4 pt-10 text-center font-semibold text-[16pt] ${
                    pkg.bgColor
                      ? `${pkg.bgColor} text-white rounded-t-[16pt]`
                      : ""
                  }`}
                >
                  {pkg.name}
                  {pkg.name === translations[language].premiumPackage && (
                    <div className="absolute top-[-10px] right-[-10px] flex items-center justify-center size-14 rounded-full bg-[#00008B] z-10">
                      <Icon
                        icon="mdi:thumb-up"
                        className="text-white"
                        width="30"
                        height="30"
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featuresList.map((feature, idx) => (
              <tr
                key={idx}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              >
                <td className="p-2 md:p-4 text-[16pt]">{feature}</td>
                {packagesData.map((pkg, index) => (
                  <td
                    key={index}
                    className={`p-2 md:p-4 text-center ${
                      pkg.name === translations[language].premiumPackage
                        ? idx % 2 === 0
                          ? pkg.altBgColor
                          : pkg.bgColor
                        : ""
                    }`}
                  >
                    {typeof pkg.features[idx] === "boolean" ? (
                      <div className="flex justify-center">
                        <Icon
                          icon={
                            pkg.features[idx]
                              ? "icon-park-solid:check-one"
                              : "ep:close-bold"
                          }
                          className={`size-[25pt] ${
                            pkg.name === translations[language].premiumPackage
                              ? "text-white"
                              : "text-black"
                          }`}
                        />
                      </div>
                    ) : (
                      <span
                        className={`${
                          pkg.name === translations[language].premiumPackage
                            ? "text-white"
                            : "text-black"
                        } text-[16pt]`}
                      >
                        {pkg.features[idx]}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <div className="h-6" />
            <tr
              className={`mt-4 ${
                featuresList.length % 2 === 0 ? "bg-white" : ""
              }`}
            >
              <td className="p-4 font-bold mt-10"></td>
              {packagesData.map((pkg, index) => (
                <td
                  key={index}
                  className={`px-[13px] py-[24px] mt-4 text-center font-bold font-inter text-[29pt] ${
                    pkg.bgColor
                  } ${pkg.bgColor ? "rounded-[16pt]" : ""} ${
                    pkg.name === translations[language].premiumPackage
                      ? "text-white"
                      : "text-[#2073DB]"
                  }`}
                >
                  {pkg.price} <span className="text-sm">{pkg.perMonth}</span>
                </td>
              ))}
            </tr>
          </tbody>
        </motion.table>
      </div>

      <motion.button
        className="px-4 py-2 rounded-[8px] text-[18pt] font-bold bg-[#1F38DB] text-white mt-2 font-inter"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {translations[language].subscribeNow}
      </motion.button>
    </div>
  );
};

export default Packages;
