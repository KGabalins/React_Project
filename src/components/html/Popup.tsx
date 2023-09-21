type PopupProps = {
  id: string;
  title: string;
  btnText: string;
  children: React.ReactNode;
};

const Popup = (props: PopupProps) => {
  const { id, title, children, btnText } = props;

  const changePopupState = () => {
    const popup = document.getElementById(`popup-${id}`);

    popup?.classList.toggle("active");

    changeDisplayButtons();
  };

  const changeDisplayButtons = () => {
    const allButtons = document.getElementsByClassName("displayBtnDiv");

    for (let i = 0; i < allButtons.length; i++) {
      allButtons[i].classList.toggle("active");
    }
  };

  return (
    <>
      <div id={`displayBtnDiv-${id}`} className="displayBtnDiv">
        <button onClick={changePopupState}>{btnText}</button>
      </div>
      <div id={`popup-${id}`} className="popup">
        <div className="cancelBtnDiv">
          <button onClick={changePopupState}>X</button>
        </div>
        <span className="title">{title}</span>
        {children}
      </div>
    </>
  );
};

export default Popup;
