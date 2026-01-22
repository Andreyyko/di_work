"use client";

import { footer_images } from "@/public/images/CommonImages/FooterImages";
import Image from "next/image";
import InitialsCircle from "../common/InitialsCircle";
import CustomSeal from "../common/CustomSeal";
import { CheckItems } from "@/constant/MainPageConstant/heroSectionData";
import CheckItem from "../common/CheckItem";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import Link from "next/link";

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
          <div className="flex flex-row justify-between w-full md:w-[590px] lg:w-[750px]">
            <div className="flex flex-col">
              <h3 className="heading-footer mb-5">Контакти</h3>
              <div className="flex flex-row items-center gap-4 mb-2.5">
                <Image
                  src={footer_images.EMAIL_ICON}
                  alt="email icon"
                  className="h-5 w-5"
                />
                <a href="mail:info@rok-m.ua" className="heading-6 opacity-100 ">
                  info@rok-m.ua
                </a>
              </div>
              <div className="flex flex-row items-center gap-4 mb-2.5">
                <Image
                  src={footer_images.PHONE_ICON}
                  alt="phone icon"
                  className="h-5 w-5"
                />
                <a href="tel:+380000000000" className="heading-6 opacity-100">
                  +380 00 000 00 00
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
                <a href="https://www.facebook.com/share/15xGzPkuLT/" target="_blank">
                  <Image
                    src={footer_images.FACEBOOK_ICON}
                    alt="facebook icon"
                    className="h-5 w-5"
                  />
                </a>
                <a href="#" target="_blank">
                  <Image
                    src={footer_images.YOUTUBE_ICON}
                    alt="youtube icon"
                    className="h-5 w-5"
                  />
                </a>
              </div>
            </div>

            <div className="flex flex-row">
              <div>
                <h3 className="heading-footer mb-5 md:mr-20">Сторінки сайту</h3>
                <div className="flex flex-col gap-2.5 heading-6 opacity-100 tracking-[-0.5px]">
                  <Link href="/catalog-methodics">Розділи</Link>
                  <Link href="/mak-gallery">Картини (МАС)</Link>
                  <Link href="/about">Про нас</Link>
                  <Link href="/faq">FAQ</Link>
                  {isSmallerThanMd && (
                    <>
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

            <CustomSeal
              label="зв’язатися з нами"
              className="w-[145px] md:w-[216px] mb-3 md:mb-0"
            />
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
    </footer>
  );
};

export default Footer;
