import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ButtonPrimary } from "../Button/styles";
import * as S from "./styles";
import { useMediaQuery } from "react-responsive";
import VerticalMenu from "../VerticalMenu";
import { useScrollBlock } from "../../utils/functions/scrollBlock";
import { useRouter } from "next/router";

interface IProps {
  variant?: boolean;
}

export default function Navbar({ variant = false }: IProps) {
  const router = useRouter();
  const isMediumDevice = useMediaQuery({ query: "(max-width: 988px)" });
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [currentLogo, setCurrentLogo] = useState<string>('https://xylo-assets.s3.amazonaws.com/images/svg/zircon-typo-dark.svg')
  const items = [
    {
      label: "Our Services",
      link: "/#services",
      subItems: [
        { label: "Blockchain", link: "https://zircon.tech/blockchain-software-company" },
        { label: "IOT", link: "https://info.zircon.tech/en-us/zircontech-services-iot" },
        { label: "Artificial Intelligence", link: "https://info.zircon.tech/en-us/zircontech-services-ai" },
        { label: "Cloud", link: "https://info.zircon.tech/en-us/zircontech-services-cloud-consultancy" },
      ],
    },
    { label: "About Us", link: "/#about-us" },
    {
      label: "Our Team",
      link: "/our-team",
    },
    {
      label: "Case Studies",
      link: "/case-study",
      subItems: [
        { label: "Infinite", link: "/case-study/infinite" },
        { label: "Cuckoo", link: "/case-study/cuckoo" },
        { label: "Givetrack", link: "/case-study/givetrack" },
        { label: "Monax", link: "/case-study/monax" },
      ],
    },
    { label: "Blog", link: "https://blog.zircon.tech/" },
  ];
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const position = winScroll / height;

    if (scrollPosition < position) {
      setShowNavbar(false);
    } else if (scrollPosition > position) {
      setShowNavbar(true);
    }

    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
  }, [scrollPosition]);

  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    if (openMenu) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [openMenu]);

  useEffect(() => {
    const logo = (isMediumDevice || scrollPosition > 0 || variant)
      ? "https://xylo-assets.s3.amazonaws.com/images/svg/zircon-typo-dark.svg"
      : "https://xylo-assets.s3.amazonaws.com/images/svg/zircon-typo.svg"
    setCurrentLogo(logo)
  }, [isMediumDevice, scrollPosition, variant]);

  return (
    <S.MainContainer showNavbar={showNavbar}>
      <S.NavbarContainer variant={variant} isScrolled={scrollPosition > 0}>
        <img
          className="pointer"
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
            window.scrollTo(0, 0);
          }}
          height="22px"
          width={isMediumDevice ? "120px" : "160px"}
          src={
            currentLogo
          }
          alt="Zircontech-Logo"
        />
        <S.MenuContainer>
          {!isMediumDevice && (
            <div className="d-flex px-4">
              {items.map((item, index) => (
                <S.MenuItem key={index}>
                  <S.ItemLink
                    variant={variant}
                    isScrolled={scrollPosition > 0}
                    href={item.link}
                  >
                    {item.label}
                  </S.ItemLink>
                </S.MenuItem>
              ))}
            </div>
          )}
          <ButtonPrimary
            className="mx-2"
            onClick={() => window.scrollTo(0, document.body.scrollHeight)}
          >
            Contact Us
          </ButtonPrimary>
          {isMediumDevice && (
            <S.MenuIcon
              src="https://xylo-assets.s3.amazonaws.com/images/svg/icons/menu.svg"
              onClick={() => setOpenMenu(!openMenu)}
              alt="Menu icon"
            />
          )}
        </S.MenuContainer>
      </S.NavbarContainer>
      <S.MenuContent
        className={`${openMenu && isMediumDevice ? "py-4" : "py-0"}`}
        isOpen={openMenu && isMediumDevice}
      >
        <VerticalMenu items={items} handleOpen={() => setOpenMenu(false)} />
        <S.Separator />
        <div
          className="d-flex flex-column flex-wrap"
          style={{ padding: "0 5%" }}
        >
          <div className="col-6 d-flex flex-column py-2">
            <S.SubLabel>misc</S.SubLabel>
            <S.Link href="#">Privacy Policy</S.Link>
          </div>
          <div className="col-6 d-flex flex-column py-2">
            <S.SubLabel>social</S.SubLabel>
            <S.Link href="https://www.linkedin.com/company/zircontech/">LinkedIn</S.Link>
            <S.Link href="https://twitter.com/Zircon_Tech">Twitter</S.Link>
            <S.Link href="https://www.facebook.com/WeAreZirconTech">Facebook</S.Link>
            <S.Link href="https://www.instagram.com/zircon.tech/">Instagram</S.Link>
          </div>
        </div>
      </S.MenuContent>
    </S.MainContainer >
  );
}
