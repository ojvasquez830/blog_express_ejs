import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.listen(port, ()=> {
    console.log(`listening in port ${port}`);
});


var posts = [{
    date: new Date(),
    id: "3eea8934-aa8a-46ac-ab17-9de34b236e18",
    title: "TestTitle",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel pharetra ipsum. Fusce sed lectus ut purus malesuada rutrum. Sed convallis dignissim sapien, eget lacinia dolor porttitor a. Aliquam suscipit erat sit amet volutpat iaculis. Aenean ornare, arcu sed pellentesque porta, sem leo fringilla mauris, sit amet elementum nisi ante nec massa. Praesent sed eleifend massa. Sed enim massa, vulputate sit amet ultrices at, faucibus vitae enim. Duis a odio eu velit imperdiet maximus tincidunt sit amet nisl. Proin condimentum tortor a elit egestas, ac hendrerit lorem commodo. Sed tempor orci in auctor suscipit. Curabitur vulputate lectus a quam lobortis porta.
    <br>
    Sed quam nisi, feugiat in ipsum non, cursus elementum justo. Sed sagittis, velit in luctus cursus, quam justo dapibus arcu, ac posuere libero libero eu turpis. Suspendisse dolor leo, mattis a sagittis vitae, sagittis dignissim neque. Maecenas luctus nec turpis nec convallis. Maecenas dictum aliquet felis non congue. Etiam id faucibus risus. Integer mollis mi ut nibh feugiat fringilla. Pellentesque ornare justo ut erat porta, vel semper tellus placerat. Duis venenatis neque vehicula, ornare purus vitae, sollicitudin orci. Donec dapibus leo vitae est lacinia, sit amet maximus est consequat. Sed faucibus condimentum orci, vel bibendum enim aliquam ut. Maecenas ornare, urna id laoreet suscipit, enim urna porttitor dui, eget sollicitudin velit leo ac lorem. Vestibulum sodales ac velit placerat scelerisque. Quisque vitae ligula dui. Aenean gravida, elit eget finibus gravida, magna ligula faucibus odio, non tristique nulla purus ac leo. Cras consequat eros vel massa mattis malesuada.
    <br>
    Suspendisse sed dictum ipsum, vel accumsan ligula. Proin facilisis suscipit sapien, ac semper est tempor viverra. Etiam consequat mi eu leo pharetra convallis. Nam tincidunt nisl eget metus varius sagittis. Nunc consequat ullamcorper eleifend. Ut ac faucibus elit, vel suscipit massa. Vestibulum congue et ligula quis molestie. Aliquam nec ex imperdiet massa laoreet elementum a at turpis. Nulla sit amet urna semper lorem porta pharetra. Nunc dolor ex, ornare et neque id, tristique posuere quam. Praesent elementum lacus sit amet sapien dignissim varius. Sed pellentesque feugiat augue, ac tristique nisi tempus nec. Nulla et magna quam. Sed a varius tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
    <br>
    Vestibulum a ex a nibh congue egestas. Quisque venenatis fringilla magna, sed sollicitudin orci facilisis quis. Aenean aliquet posuere porttitor. Fusce sit amet diam urna. Phasellus scelerisque ultricies ipsum, et lacinia mi tempus quis. Vestibulum rutrum a sem vel luctus. Vivamus eget ex iaculis, malesuada augue et, faucibus ipsum. Pellentesque posuere urna fringilla, pretium libero ut, placerat purus. Nunc id tortor pharetra, laoreet purus eu, imperdiet libero. Maecenas commodo rutrum est vitae consequat. Donec sed erat at quam aliquam pellentesque.
    <br>
    Nam purus felis, vehicula aliquam elit vitae, fringilla consectetur turpis. Pellentesque ullamcorper tincidunt ipsum, nec eleifend quam malesuada nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut at nisi enim. Suspendisse tempus erat ut luctus sagittis. Mauris gravida tortor non lacus aliquet, at convallis mi hendrerit. Sed ut diam posuere, commodo ante in, maximus leo. In massa diam, mollis a ultricies eu, rhoncus vitae augue. Vivamus vel placerat urna.
`
}];

app.get("/", (req, resp) => {
    resp.render("index.ejs", {posts: posts, links: [
        {name: "Home", ref: "/", active: true}, 
        {name: "Create", ref: "/create"}
    ]});
})

app.get("/post", (req, res)=> {
    var post;
    for (let i = 0; i < posts.length; i++)
    {
        if (posts[i].id == req.query.postId)
        {
            post = posts[i];
            break;
        }
    }

    if (!post)
    {
        res.sendStatus(404);
    }
    else 
    {
        res.render('post.ejs', {
            post: post,
            links: [
                {name: "Home", ref: "/" }, 
                {name: "Create", ref: "/create"},
                {name: "Edit", ref: "javascript:SwitchToEdit();"}
            ]});
    }

});

app.get("/create", (req, resp) => {
    resp.render("create.ejs", {links: [
        {name: "Home", ref: "/" }, 
        {name: "Create", ref: "/create", active: true }
    ]});

});

app.post("/create", (req, resp) => {
    const id = uuidv4();
    posts.push( {
        id: id,
        date: new Date(),
        title: req.body.titleI,
        text: req.body.textI.replace(/(?:\r\n|\r|\n)/g, '<br>')
    });
    resp.redirect("/post?postId=" + id);
})

app.post("/edit", (req, resp) => {
    var post;
    for (let i = 0; i < posts.length; i++)
    {
        if (posts[i].id == req.query.postId)
        {
            post = posts[i];
            break;
        }
    }

    if (post)
    {
        post.title = req.body.titleI;
        post.text = req.body.textI.replace(/(?:\r\n|\r|\n)/g, '<br>');
        resp.redirect("/post?postId=" + post.id);
    }
    else{
        res.sendStatus(404);
    }
})