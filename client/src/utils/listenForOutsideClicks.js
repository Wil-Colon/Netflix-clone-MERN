export default function listenForOutsideClicks(
    listening,
    setListening,
    listItemLarge,
    setIsOpen
) {
    return () => {
        if (listening) return;
        if (!listItemLarge.current) return;
        setListening(true);
        [`click`, `touchstart`].forEach((type) => {
            document.addEventListener(`click`, (evt) => {
                const cur = listItemLarge.current;
                const node = evt.target;
                if (cur?.contains(node)) return;
                setIsOpen(false);
            });
        });
    };
}
