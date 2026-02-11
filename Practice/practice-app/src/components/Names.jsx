export default function Names({name, showNames,TextContainer, children}) {
    const Container = TextContainer;
    let content = <p>Name is Hidden</p>;

    if(showNames === true) {
        content = <TextContainer>Name is : {name} {children}</TextContainer>;
    }
    return (<>
        {content}
    </>);
}