"use client";

import { footer_images } from "@/public/images/CommonImages/FooterImages";
import Image from "next/image";
import InitialsCircle from "../common/InitialsCircle";
import CustomSeal from "../common/CustomSeal";
import { CheckItems } from "@/constant/MainPageConstant/heroSectionData";
import CheckItem from "../common/CheckItem";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import Link from "next/link";
import { main_page_backrounds } from "@/public/images/MainPageImages/backgrounds";

const Footer = () => {
  const { isSmallerThanMd, isSmallerThanLg } = useWindowWidth();

  const flowerImage = isSmallerThanMd
    ? footer_images.FLOWER_IMAGE_MOBILE
    : footer_images.FLOWER_IMAGE;

  return (
    <footer className="w-full min-h-[200px] relative px-5 overflow-hidden pt-37.5">
      <Image
        src={flowerImage}
        alt="footer flower"
        className="
          pointer-events-none select-none 
          absolute left-[68%] md:left-[64%] -translate-x-1/2  top-[79%]
          md:top-[45%] -translate-y-1/2 
          w-60 md:w-[850px] 
        "
      />

      <div className="relative z-10 ">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-between w-full md:w-[790px] lg:w-[850px]">
            <div className="flex flex-col">
              <h3 className="heading-footer mb-5">Контакти</h3>
              <div className="flex flex-row items-center gap-4 mb-2.5">
                <Image
                  src={footer_images.EMAIL_ICON}
                  alt="email icon"
                  className="h-5 w-5"
                />
                <a href="mail:bogdanaandrejko@gmail.com" className="heading-6 opacity-100 ">
                bogdanaandrejko@gmail.com
                </a>
              </div>
              <div className="flex flex-row items-center gap-4 mb-2.5">
                <Image
                  src={footer_images.PHONE_ICON}
                  alt="phone icon"
                  className="h-5 w-5"
                />
                <a href="tel:+380979200740" className="heading-6 opacity-100">
                +38 (097) 920-07-40
                </a>
              </div>
              <div className="flex flex-row gap-7.5 md:gap-5">
                <a
                  href="https://www.instagram.com/bogdanagalitskaandreiko/"
                  target="_blank"
                >
                  <Image
                    src={footer_images.INTAGRAM_ICON}
                    alt="intagram icon"
                    className="h-5 w-5"
                  />
                </a>
                <a
                  href="https://www.facebook.com/share/15xGzPkuLT/"
                  target="_blank"
                >
                  <Image
                    src={footer_images.FACEBOOK_ICON}
                    alt="facebook icon"
                    className="h-5 w-5"
                  />
                </a>
              </div>
            </div>

            <div className="flex flex-row translate-x-[25px] md:translate-x-0">
              <div>
                <h3 className="heading-footer mb-5 md:mr-20">Сторінки сайту</h3>
                <div className="flex flex-col gap-2.5 heading-6 opacity-100 tracking-[-0.5px]">
                  <Link href="/catalog-methodics">Розділи</Link>
                  <Link href="/mak-gallery">Картини (МАС)</Link>
                  <Link href="/about">Про нас</Link>
                  <Link href="/faq">FAQ</Link>
                  {isSmallerThanMd && (
                    <>
 <p className="heading-6 opacity-100 tracking-[-0.5px]">ФОП Андрейко Богдана Володимирівна</p>
 <p className="heading-6 opacity-100 tracking-[-0.5px]">ІПН: 3100916566</p>
                      <Link
                        href="/privacy"
                        className="heading-6 opacity-100 tracking-[-0.5px]"
                      >
                        Політика конфіденційності
                      </Link>
                      <Link
                        href="/terms-of-use"
                        className="heading-6 opacity-100 tracking-[-0.5px]"
                      >
                        Умови користування
                      </Link>
                    </>
                  )}
                </div>
              </div>
              {!isSmallerThanMd && (
                <div>
                  <h3 className="heading-footer mb-5 max-w-[300px]">
                    Юридичне
                  </h3>
                  <div className="flex flex-col gap-2.5">
                  <p className="heading-6 opacity-100 tracking-[-0.5px]">ФОП Андрейко Богдана Володимирівна</p>
                  <p className="heading-6 opacity-100 tracking-[-0.5px]">ІПН: 3100916566</p>
                    <Link href="/privacy" className="heading-6 opacity-100">
                      Політика конфіденційності
                    </Link>
                    <Link
                      href="/terms-of-use"
                      className="heading-6 opacity-100"
                    >
                      Умови користування
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          {!isSmallerThanMd && (
            <InitialsCircle size="xl" className=" lg:mt-5" />
          )}
        </div>
        {isSmallerThanMd && (
          <div className="flex">
            {" "}
            <CheckItem
              items={CheckItems}
              showFor={[0, 1, 2]}
              minText
              className="mt-8 font-grava text-brand-gray whitespace-nowrap text-[clamp(19px, 3vw, 18px)] "
            />{" "}
            <span className="heading-bg leading-[67px] -translate-x-21 translate-y-10">
              {" "}
              Сила<span className="mx-2">в</span>тобі{" "}
            </span>{" "}
          </div>
        )}

        <div className="flex relative flex-row justify-between items-end mt-16">
          <div className=" z-5 flex flex-row md:w-[750px] justify-between mb-5">
            {isSmallerThanMd && (
              <InitialsCircle
                size="sm"
                className="
            absolute
            right-[-5px]
            top-[95px]
            z-20
        "
              />
            )}

            {isSmallerThanMd && (
              <span
                className="
          heading-5 text-right whitespace-nowrap leading-3
          absolute
          right-[-18px]
          top-[100px]
          w-[260px]
          z-[-1]
        "
              >
                Матеріали мають освітній <br /> характер, не замінюють <br />
                особистої терапії, автор не несе <br />
                відповідальності за самостійне <br />
                застосування.
              </span>
            )}
            <Link href={"/#contact"}>
              <CustomSeal
                label="зв’язатися з нами"
                className="w-[145px] md:w-[216px] mb-3 md:mb-0"
              />
            </Link>
            {!isSmallerThanMd && (
              <div className="flex flex-col justify-end">
                <span className="heading-bg leading-[67px]">
                  Сила<span className="mx-6">в</span>тобі
                </span>
                <CheckItem
                  items={CheckItems}
                  showFor={[0, 1, 2]}
                  minText
                  className="font-grava text-brand-gray whitespace-nowrap text-[clamp(19px, 3vw, 18px)] "
                />
              </div>
            )}
          </div>

          {!isSmallerThanLg && (
            <span className="heading-5 text-right lg:leading-6 xl:leading-8 w-[300px]">
              Матеріали мають <br />
              освітній характер, не
              <br />
              замінюють особистої
              <br />
              терапії, автор не несе <br />
              відповідальності за
              <br />
              самостійне застосування.
            </span>
          )}
        </div>
      </div>
      <div
        className="w-screen left-1/2 -translate-x-1/2 text-center heading-4 text-sm relative z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${main_page_backrounds.FOOTER_BACKGROUND.src})`,
        }}
      >
        <p>
          Copyright{" "}
          <span className="font-sans inline-block align-baseline">©</span>{" "}
          2026 ROK-M. Усі права захищені. Автор і власник:
          Андрейко, Б. В. Усі матеріали, включаючи методологічну структуру,
          науково-методичну адаптацію та навчальний контент, є результатом
          інтелектуальної праці автора та охороняються авторським правом і
          чинними міжнародними нормами у сфері інтелектуальної власності.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
