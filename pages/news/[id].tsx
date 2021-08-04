import Nav from "@modules/nav/Nav"
import styles from "./new.module.sass"
import { ParsedUrlQuery } from "querystring"
import { GetStaticPaths, GetStaticProps } from "next"
import { v4 as uuid } from "uuid"
import { getNewsPaths, getNewsPostBySlug, NewsPost } from "@/lib/api/lang"

interface Props {
  content: NewsPost
}

const NewPage: React.FC<Props> = ({ content: { title, subsection, text, date } }) => {
  return (
    <>
      <Nav />
      <div className={styles.new}>
        <div className={styles.new__wrapper}>
          <div className={styles.new__title}>{title}</div>
          <hr />
          <div className={styles.new__date}>{date}</div>
          <div className={styles.new__text} dangerouslySetInnerHTML={{__html: text}}>
          </div>
          <div className={styles.new__stats}>
            <div className={styles.new__com}>
              <img src={"/comment.svg"} className={styles.new__comImg} />
              <span className={styles.new__comNum}>1024</span>
            </div>
            <div className={styles.new__view}>
              <img src={"/eye.svg"} className={styles.new__viewImg} />
              <span className={styles.new__viewNum}>768</span>
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
              <div className={styles.comment__body}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab reprehenderit, sint praesentium laborum modi quia amet debitis placeat doloremque tenetur.</div>
            </div>
            <div className={styles.comment}>
              <div className={styles.comment__stats}>
                <div className={styles.comment__name}>Name</div>
                <div className={styles.comment__time}>18:33</div>
                <div className={styles.comment__date}>21 Aug 2021</div>
              </div>
              <div className={styles.comment__body}>{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab reprehenderit, sint praesentium laborum modi quia amet debitis placeat doloremque tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat possimus veritatis quia a tenetur quas, obcaecati quaerat nam eos aliquam? Consequatur saepe illum quas, praesentium deleniti harum tempora soluta nulla.`}</div>
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

export const getStaticPaths: GetStaticPaths = async ({ locales, defaultLocale }) => {
  const loc = locales ?? [defaultLocale] as string[]
  const paths = await getNewsPaths(loc)
  return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id, locale } = context.params as IParams
  const content = await getNewsPostBySlug(id)

  return { props: { content } }
}
