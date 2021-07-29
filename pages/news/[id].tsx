import Nav from "@modules/nav/Nav"
import styles from "./new.module.sass"
import { ParsedUrlQuery } from "querystring"
import { GetStaticPaths, GetStaticProps } from "next"
import { v4 as uuid } from "uuid"

interface Props {
  id: string
}

const NewPage: React.FC<Props> = ({ id }) => {
  return (
    <>
      <Nav />
      <div className={styles.new}>
        <div className={styles.new__wrapper}>

          <div className={styles.new__title}>Title</div>
          <hr />
          <div className={styles.new__date}>06 Jun 2021</div>
          <div className={styles.new__text}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A eveniet rem, ipsam debitis, aut eaque laboriosam nam quis quod dignissimos error dolores aperiam excepturi commodi numquam architecto veniam assumenda, rerum deleniti. Labore maxime reiciendis in delectus cumque velit facere! Inventore!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt est iure accusantium officiis minima aspernatur beatae inventore incidunt explicabo laborum?</p>
          </div>
          <div className={styles.new__stats}>
            <div className={styles.new__com}>
              <img src={"/comment.svg"} className={styles.new__comImg} /><span className={styles.new__comNum}>1024</span>
            </div>
            <div className={styles.new__view}>
              <img src={"/eye.svg"} className={styles.new__viewImg} /><span className={styles.new__viewNum}>768</span>
            </div>
          </div>
          <hr />
          <div className={styles.new__form}>
            <textarea id="" className={styles.new__formTextarea} placeholder={"Comment"}></textarea>
            <div className={styles.new__formWrap}>
              <input type="text" className={styles.new__formName} placeholder={"Name"} />
              <button className={styles.new__formBtn}>Send</button>
            </div>
          </div>
          <div className={styles.new__commentList}>
            <div className={styles.comment}>
              <div className={styles.comment__stats}>
                <div className={styles.comment__name}>Name</div>
                <div className={styles.comment__time}>18:33</div>
                <div className={styles.comment__date}>21 Aug 2021</div>
              </div>
              <div className={styles.comment__body}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab reprehenderit, sint praesentium laborum modi quia amet debitis placeat doloremque tenetur.
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.comment__stats}>
                <div className={styles.comment__name}>Name</div>
                <div className={styles.comment__time}>18:33</div>
                <div className={styles.comment__date}>21 Aug 2021</div>
              </div>
              <div className={styles.comment__body}>
                {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab reprehenderit, sint praesentium laborum modi quia amet debitis placeat doloremque tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat possimus veritatis quia a tenetur quas, obcaecati quaerat nam eos aliquam? Consequatur saepe illum quas, praesentium deleniti harum tempora soluta nulla.`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewPage

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const loc = locales ?? ["en"]
  const news = [{
    params: {
      id: "new1",
    },
  }]
  const paths = loc.map(locale => news.map(item => ({ ...item, locale }))).flat(1)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id, locale } = context.params as IParams
  const loc = typeof locale === "string" ? locale : "en"
  

  return { props: { id } }
}
