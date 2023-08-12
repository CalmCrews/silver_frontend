import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { PlayArrow, Pause, Close, SettingsOutlined } from "@mui/icons-material";
import { Modal, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { styled } from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface VideoComponentProps {
  sellerProfile: string;
  productTitle: string;
  productId: number;
  videoUrl: string;
}

const PlayerAppbar = styled.div`
  position: absolute;
  top: 0%;
  width: 100%;
  height: 80px;
  background: linear-gradient(#3a3a3a, #3a3a3a, #3a3a3a00);
  z-index: 3000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  left: calc(50% - 30px);
  border-radius: 30px;
  border: 2px solid #a394ff;
  background-color: #fff;
  object-fit: cover;
`;

const BuyingButton = styled.button`
  position: absolute;
  display: flex;
  top: 600px;
  left: calc(50% - 170px);
  width: 340px;
  border-radius: 100px;
  border: 2px solid #a394ff;
  background: #a394ff;
  color: #fff;
  text-align: center;
  padding: 15px;
  font-size: 1.5rem;
  font-weight: 700;
  z-index: 3000;
  text-align: center;
  justify-content: center;
`;

const MenuItemButton = styled.button`
  width: 110px;
  padding: 9px;
  background-color: rgba(58, 58, 58, 0.5);
  border-radius: 100px;
  border: 1px solid #a394ff;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  justify-content: center;
  align-items: center;
`

const VideoPlayer = ({
  sellerProfile,
  productTitle,
  productId,
  videoUrl,
}: VideoComponentProps) => {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const playerRef = useRef(null);

  const handleBuyProduct = () => {
    //navigate to buying page
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* 작게 보기 */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "290px",
          overflow: "hidden",
          position: "relative",
          objectFit: "cover",
          alignItems: "center",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
      >
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          width="100%"
          height="auto"
          playing={isPlaying}
          volume={1}
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          playsinline
        />
        {showButton && (
          <IconButton
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              color: "#fff",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              transition: "opacity 0.3s",
              opacity: isPlaying ? 0.7 : 1,
            }}
          >
            {isPlaying ? (
              <Pause fontSize="large" />
            ) : (
              <PlayArrow fontSize="large" />
            )}
          </IconButton>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsPlaying(false);
            setIsFullscreenOpen(true);
          }}
          sx={{ position: "absolute", top: "0", right: "0" }}
        >
          크게보기
        </Button>
      </div>

      {/* 전체보기 모달 */}
      <Modal
        open={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        aria-labelledby="video-modal-title"
        container={() => document.querySelector(".mobile-view")}
        sx={{
          position: "absolute",
          height: "100%",
        }}
      >
        <>
          <Box
            sx={{
              position: "absolute",
              top: "0",
              width: "100%",
              height: "auto",
            }}
          >
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="auto"
              playing
              playsinline
              style={{ zIndex: "2000" }}
            />
          </Box>
          <PlayerAppbar>
            <ProfileImage src={sellerProfile} alt="seller_profile" />
            <h2 style={{ color: "#fff", fontSize: "1.5rem" }}>
              {productTitle}
            </h2>
            <IconButton onClick={() => setIsFullscreenOpen(false)}>
              <Close sx={{ color: "#fff" }} />
            </IconButton>
          </PlayerAppbar>
          <BuyingButton onClick={handleBuyProduct}>
            모임원과 함께 구매하기
          </BuyingButton>
          <div
            style={{
              display: "flex",
              position: "absolute",
              zIndex: "3000",
              top: "520px",
              right: "25px",
            }}
          >
            <IconButton
              onClick={handleClick}
              sx={{ backgroundColor: "#A394FF" }}
            >
              <SettingsOutlined
                sx={{ color: "#fff", width: "30px", height: "30px" }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "bottom", horizontal: "right" }}
              sx={{
                "& .MuiPopover-paper": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  
                },
              }}
            >
              <MenuItem onClick={handleClose} >
                <MenuItemButton>자막</MenuItemButton>
              </MenuItem>
              <MenuItem onClick={handleClose} sx={{marginBottom: "2rem"}}>
                <MenuItemButton>느리게</MenuItemButton>
              </MenuItem>
            </Menu>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default VideoPlayer;
